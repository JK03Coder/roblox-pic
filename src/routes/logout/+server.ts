import { initializeLucia } from '$lib/server/lucia';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, platform }) => {
  const session = await locals.auth.validate();
  if (!session) return new Response(null, { status: 401 });
  const auth = initializeLucia(platform?.env.DB);
  await auth.invalidateSession(session.sessionId); // invalidate session
  locals.auth.setSession(null); // remove cookie
  return new Response(null, {
    status: 302,
    headers: {
      location: '/',
    },
  });
};
