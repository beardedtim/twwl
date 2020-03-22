import defaultConfig from "@/Common/Config";

export default Object.assign({}, defaultConfig, {
  PORT: process.env.GQL_INPUT_PORT || 5000,
  NAME: process.env.GQL_SERVICE_NAME || "__UNNAMED_GQL_SERVICE__",
  LEVEL: process.env.GQL_LOG_LEVEL || "trace"
});
