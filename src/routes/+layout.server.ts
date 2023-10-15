import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
  const session = await locals.auth.validate();
  if (!session) {
    return {
      isAuth: false,
    };
  }
  return {
    isAuth: true,
    robloxId: session.user.robloxId,
    username: session.user.username,
  };
}) satisfies LayoutServerLoad;
