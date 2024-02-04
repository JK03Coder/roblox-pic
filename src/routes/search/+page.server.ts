import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { UsersData } from '$lib/types';

export const load = (async () => {
  return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
  search: async ({ request }) => {
    await new Promise((fulfil) => setTimeout(fulfil, 1000));
    const data = await request.formData();
    const username = data.get('search');

    const response = await fetch(
      `https://users.roblox.com/v1/users/search?keyword=${username}&limit=10`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      }
    );
    const users: UsersData = await response.json();

    // TODO add a check if data is undefined

    const userData = users.data.map(({ id, name, displayName }) => ({
      id,
      name,
      displayName,
    }));

    return {
      users: userData,
    };
  },
};
