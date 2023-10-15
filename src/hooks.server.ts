import { redirect, type Handle } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { connectD1, waitUntil } from 'wrangler-proxy';
import { initializeLucia } from '$lib/server/lucia';

export const handle: Handle = async ({ event, resolve }) => {
  // in dev mode you have to use a proxy to connect to your database
  // this is if you want to use wrangler dev with vite dev as the source.
  // https://www.npmjs.com/package/wrangler-proxy
  if (dev) {
    // @ts-ignore
    event.platform = {
      ...event.platform,
      env: {
        DB: connectD1('DB'),
      },
      context: {
        waitUntil: waitUntil,
      },
      // not sure what to to with caches when using proxy.
      // caches:
    };
    // TODO: add other env vars here
  }

  if (event.platform) {
    const auth = initializeLucia(event.platform?.env.DB);
    event.locals.auth = auth.handleRequest(event);
  }

  if (event.url.pathname.startsWith('/dashboard')) {
    const session = await event.locals.auth.validate();
    if (!session) {
      throw redirect(303, '/');
    }
  }

  return resolve(event);
};
