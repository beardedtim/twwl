import defaultConfig from "@/Common/Config";

export default Object.assign({}, defaultConfig, {
  MONGOOSE_URI: `mongodb://${process.env.MONGO_URI}:${process.env.MONGO_PORT}/series`,
  NAME: "__SERIES_DOMAIN__",
  LOG_LEVEL: process.env.LOG_LEVEL || "trace"
});
