/**
 *
 * This file is where we can set up any
 * shared configurations such as "Is this
 * service in production?" or "What's the
 * shared JWT Token?"
 *
 */
export default {
  IS_PRODUCTION: process.env.NODE_ENV === "production"
};
