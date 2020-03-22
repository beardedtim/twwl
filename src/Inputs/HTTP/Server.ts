import express from "express";
import HTTP from "http";
import { Logger } from "pino";

import Config from "@/Inputs/HTTP/Config";
import ApplyMiddleware from "@/Inputs/HTTP/Middleware/Apply";
import Router from "@/Inputs/HTTP/Router";
import InputLogger from "@/Inputs/HTTP/Logger";

class Server {
  #Application: express.Application;
  #Instance?: HTTP.Server;
  #log: Logger;

  constructor({ log }: { log?: Logger } = {}) {
    this.#log = log || InputLogger;
    this.#Application = express();
  }

  private applyRoutes() {
    this.#Application.use(Router());
  }

  start(cb: () => void) {
    // Apply the middleware
    ApplyMiddleware({ logger: this.#log, app: this.#Application });
    // Apply the routes
    this.applyRoutes();

    // Now, create the Server Instance
    this.#Instance = this.#Application.listen(Config.PORT, cb);

    return this;
  }

  stop(cb: () => void) {
    if (this.#Instance) {
      this.#Instance.close(cb);
    }
  }
}

export default Server;
