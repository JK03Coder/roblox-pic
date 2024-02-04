import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { AvatarData, ImageData } from '$lib/types';

/*
request
https://thumbnails.roblox.com/v1/users/avatar-3d?userId=201872425

response
{
  "targetId": 201872425,
  "state": "Completed",
  "imageUrl": "https://t3.rbxcdn.com/a4a312c1489cc3f4b2804ddbc3604c76",
  "version": "TN2"
}

imageUrl response
{
  "camera":{
    "position":{"x":-2.39462,"y":104.925,"z":-4.87761},
    "direction":{"x":-0.40558,"y":0.40558,"z":-0.819152},
    "fov":70.0
  },
  "aabb":{
    "min":{"x":-2.05461,"y":99.938,"z":-0.605016},
    "max":{"x":2.10259,"y":105.063,"z":0.663589}
  },
  "mtl":"4764cba4a1209ba4f61dda1fe4ad99ab",
  "obj":"38792489581b37daca148ff26f132c1d",
  "textures":["9c99d6480971c6b52fc1558df853155d"]
}
*/

export const load = (async ({ url }) => {
  const rid = url.searchParams.get('id');

  if (rid === null || !/^\d+$/.test(rid)) {
    throw redirect(303, '/dashboard');
  }
  try {
    const data: AvatarData = await getAvatarData(rid!, 300);

    const imageUrl = data.imageUrl;
    const imageResponse = await fetch(imageUrl);
    const imageData: ImageData = await imageResponse.json();

    const { camera, aabb, mtl, obj }: ImageData = imageData;

    if (!camera || !aabb || !mtl || !obj) {
      throw new Error('Invalid data received');
    }

    return { camera, aabb, mtl, obj };
  } catch (error) {
    console.error('Error: ', error);
    redirect(303, '/dashboard');
  }
}) satisfies PageServerLoad;

async function getAvatarData(
  rid: string,
  waitTime: number
): Promise<AvatarData> {
  const response = await fetch(
    `https://thumbnails.roblox.com/v1/users/avatar-3d?userId=${rid}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }
  );
  const data: AvatarData = await response.json();

  if (data.state === 'Pending') {
    await new Promise((resolve) => setTimeout(resolve, waitTime));
    return getAvatarData(rid, waitTime);
  } else if (data.state !== 'Completed') {
    throw new Error(
      'Something went wrong fetching initial avatar request ' +
        JSON.stringify(data)
    );
  }

  return data;
}
