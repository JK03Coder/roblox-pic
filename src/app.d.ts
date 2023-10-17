// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface PageData {}
    interface Platform {
      env: {
        DB: D1Database;
      };
      context: {
        waitUntil(promise: Promise<any>): void;
      };
      caches: CacheStorage & { default: Cache };
    }
    interface Locals {
      auth: import('lucia').AuthRequest;
    }
  }
  namespace Lucia {
    type Auth = import('$lib/server/lucia').Auth;
    type DatabaseUserAttributes = {
      username: string;
    };
    type DatabaseSessionAttributes = {};
  }
}

export {};
