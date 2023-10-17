import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { dev } from '$app/environment';
import { d1 } from '@lucia-auth/adapter-sqlite';
import type { D1Database } from '@cloudflare/workers-types';

export const initializeLucia = (db: D1Database|undefined) => {
	if (!db) throw Error('db is invalid (lucia)');
	const auth = lucia({
		adapter: d1(db, {
			user: 'user',
			key: 'user_key',
			session: 'user_session'
		}),
		env: dev ? 'DEV' : 'PROD',
		middleware: sveltekit(),

		getUserAttributes: (data) => {
			return {
				username: data.username
			};
		}
	});
	return auth;
};

export type Auth = ReturnType<typeof initializeLucia>;
