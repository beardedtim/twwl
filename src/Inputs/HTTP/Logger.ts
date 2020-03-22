import createLogger from "@/Common/Logger";
import Config from "@/Inputs/HTTP/Config";

const logger = createLogger({
  name: Config.NAME,
  level: Config.LEVEL,
  pretty: true
});

export default logger;
