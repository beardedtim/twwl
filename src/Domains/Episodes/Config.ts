import defaultConfig from "@/Common/Config";

export default Object.assign({}, defaultConfig, {
  MONGOOSE_URI: `mongodb://${process.env.MONGO_URI}:${process.env.MONGO_PORT}/episodes`,
  NAME: "__EPISODES_DOMAIN__",
  LOG_LEVEL: process.env.LOG_LEVEL || defaultConfig.IS_TEST ? "fatal" : "trace"
});
