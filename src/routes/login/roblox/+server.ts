import type { RequestHandler } from './$types';
import { dev } from '$app/environment';
import { createOAuth2AuthorizationUrl } from '@lucia-auth/oauth';
import { ROBLOX_CLIENT_ID, ROBLOX_REDIRECT_URI } from '$env/static/private';

export const GET: RequestHandler = async ({ cookies }) => {
	const [url, state] = await createOAuth2AuthorizationUrl(
		'https://apis.roblox.com/oauth/v1/authorize',
		{
			clientId: ROBLOX_CLIENT_ID,
			scope: ['openid', 'profile'],
			redirectUri: ROBLOX_REDIRECT_URI
		}
	);
	// store state
	cookies.set('roblox_oauth_state', state, {
		httpOnly: true,
		secure: !dev,
		path: '/',
		maxAge: 60 * 60
	});
	return new Response(null, {
		status: 302,
		headers: {
			Location: url.toString()
		}
	});
};
