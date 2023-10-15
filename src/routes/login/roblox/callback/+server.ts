import type { RequestHandler } from './$types';
import { initializeLucia } from '$lib/server/lucia';
import {
	OAuthRequestError,
	providerUserAuth,
	validateOAuth2AuthorizationCode
} from '@lucia-auth/oauth';
import { ROBLOX_CLIENT_ID, ROBLOX_CLIENT_SECRET, ROBLOX_REDIRECT_URI } from '$env/static/private';

type AccessTokenResult = {
	access_token: string;
};

export const GET: RequestHandler = async ({ url, cookies, locals, platform }) => {
	const storedState = cookies.get('roblox_oauth_state');
	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code');
	// validate state
	if (!storedState || !state || storedState !== state || !code) {
		return new Response('invalid state' + storedState + ' | ' + state + ' | ' + code, {
			status: 400,
			headers: { 'Content-Type': 'text/plain' }
		});
	}
	try {
		const auth = initializeLucia(platform?.env.DB);
		const tokens = await validateOAuth2AuthorizationCode<AccessTokenResult>(
			code,
			'https://apis.roblox.com/oauth/v1/token',
			{
				clientId: ROBLOX_CLIENT_ID,
				clientPassword: {
					clientSecret: ROBLOX_CLIENT_SECRET,
					authenticateWith: 'client_secret'
				},
				redirectUri: ROBLOX_REDIRECT_URI
			}
		);
		const accessToken = tokens.access_token;

		interface UserInfo {
      sub: string;
      preferred_username: string;
    }
		// get user data
		// sub is roblox player id
		const { sub: playerId, preferred_username }: UserInfo = await fetch('https://apis.roblox.com/oauth/v1/userinfo', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		}).then((response) => response.json());

		const robloxUserAuth = providerUserAuth(auth, 'roblox', playerId);

		const getUser = async () => {
			const existingUser = await robloxUserAuth.getExistingUser();
			if (existingUser) return existingUser;

			const user = await robloxUserAuth.createUser({
				attributes: {
					username: preferred_username,
					robloxId: playerId
				}
			});
			return user;
		};

		const user = await getUser();
		const session = await auth.createSession({
			userId: user.userId,
			attributes: {}
		});
		locals.auth.setSession(session);
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
			}
		});
	} catch (e) {
		if (e instanceof OAuthRequestError) {
			console.error('invalid code: ', e);
			return new Response(null, {
				status: 400
			});
		}
		console.error(e);
		return new Response('invalid state' + String(e), {
			status: 500,
			headers: { 'Content-Type': 'text/plain' }
		});
	}
};
