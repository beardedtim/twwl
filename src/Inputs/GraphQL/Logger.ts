import createLog from "@/Outputs/Logger";
import Config from "@/Inputs/GraphQL/Config";

export default createLog({
  name: Config.NAME,
  level: Config.LEVEL,
  pretty: Config.IS_PRODUCTION !== true
});
