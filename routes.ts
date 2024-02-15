/**
 * Routes definition for making easy handling private and public routes on the middleware.ts
 */

/**
 * An Array of routes that are accessible to the public
 * These routes do not require authentication
 * @type{string[]}
 */
export const publicRoutes: string[] = [];

/**
 * An Array of routes that are use for authentication
 * These routes will redirect logged in users to /settings
 * @type{string[]}
 */
export const authRoutes: string[] = ["/"];

/**
 * An Array of admin routes that are use for authentication
 * These routes will redirect not admin users to /dashboard
 * @type{string[]}
 */
export const adminRoutes: string[] = ["/users", "/users/new"];

/**
 * The prefix for API authentication routes
 * Routes that need to be always accessible for Next auth to use them
 * @type{string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The prefix for API webhook routes
 * These routes do not require authentication
 * @type{string}
 */
export const apiWebhookPrefix: string = "/api/webhook";

/**
 * The default redirect path after logging in
 * @type{string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
