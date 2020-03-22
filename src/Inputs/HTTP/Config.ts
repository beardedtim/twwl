import defaultConfig from "@/Common/Config";

/**
 *
 * This value is going to extend the
 * default configuration.
 *
 */
export default Object.assign({}, defaultConfig, {
  ...defaultConfig,
  PORT: process.env.HTTP_INPUT_PORT || 5000,
  NAME: process.env.HTTP_SERVICE_NAME || "__UNNAMED_HTTP_SERVICE__",
  LEVEL: process.env.HTTP_LOG_LEVEL || "trace",
  API_PREFIX: process.env.HTTP_API_PREFIX || "/api"
});
