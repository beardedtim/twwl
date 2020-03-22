import createLogger from "@/Outputs/Logger";
import Config from "@/Inputs/HTTP/Config";

export default createLogger({
  name: Config.NAME,
  level: Config.LEVEL,
  pretty: true
});
