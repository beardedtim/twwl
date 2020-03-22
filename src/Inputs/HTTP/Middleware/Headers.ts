import cors from "cors";
import helmet from "helmet";

export default () => [cors(), helmet()];
