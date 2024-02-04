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

    /*
    const users = {
      previousPageCursor: null,
      nextPageCursor:
        'eyJzdGFydEluZGV4IjoxMCwiZGlzY3JpbWluYXRvciI6ImtleXdvcmQ6YXdlc29tZW5pbmphc2Vzc2lvbklkOiIsImNvdW50IjoxMH0KZjUwZDNkMDNhNzlmZDFjNWE1YjlhNWJlOGI1YjM0NzM5YjcyOWI0NGFmMTUxYjE5M2QxZjVjNjllOWYzNDViMQ==',
      data: [
        {
          previousUsernames: [],
          hasVerifiedBadge: false,
          id: 189226906,
          name: 'AwesomeNinja_23',
          displayName: 'AwesomeNinja_23',
        },
        {
          previousUsernames: [],
          hasVerifiedBadge: false,
          id: 2172481,
          name: 'Awesomeninja',
          displayName: 'Awesomeninja',
        },
        {
          previousUsernames: [],
          hasVerifiedBadge: false,
          id: 3786682255,
          name: 'awesomeninjald',
          displayName: 'awesomeninja',
        },
        {
          previousUsernames: [],
          hasVerifiedBadge: false,
          id: 1194919457,
          name: 'poiuhythyjd',
          displayName: 'AwesomeNinja',
        },
        {
          previousUsernames: [],
          hasVerifiedBadge: false,
          id: 1128644800,
          name: 'awesomeninja8790',
          displayName: 'Nogodplsnopully',
        },
        {
          previousUsernames: [],
          hasVerifiedBadge: false,
          id: 1107939920,
          name: 'AwesomeNinja2810',
          displayName: 'AwesomeNinja2810',
        },
        {
          previousUsernames: [],
          hasVerifiedBadge: false,
          id: 120631702,
          name: 'awesomeninja3334',
          displayName: 'awesomeninja3334',
        },
        {
          previousUsernames: [],
          hasVerifiedBadge: false,
          id: 533754013,
          name: 'awesomeninjaq',
          displayName: 'awesomeninjaq',
        },
        {
          previousUsernames: [],
          hasVerifiedBadge: false,
          id: 1176630186,
          name: 'awesomeninjadude097',
          displayName: 'Awesome',
        },
        {
          previousUsernames: [],
          hasVerifiedBadge: false,
          id: 236823646,
          name: 'AwesomeNinjaBoy77',
          displayName: 'AwesomeNinjaBoy77',
        },
      ],
    };
    */

    /*
    const users = {
      previousPageCursor: null,
      nextPageCursor:
        'eyJzdGFydEluZGV4IjoxMCwiZGlzY3JpbWluYXRvciI6ImtleXdvcmQ6YXdlc29tZW5pbmphc2Vzc2lvbklkOiIsImNvdW50IjoxMH0KZjUwZDNkMDNhNzlmZDFjNWE1YjlhNWJlOGI1YjM0NzM5YjcyOWI0NGFmMTUxYjE5M2QxZjVjNjllOWYzNDViMQ==',
      data: [],
    }; */

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
