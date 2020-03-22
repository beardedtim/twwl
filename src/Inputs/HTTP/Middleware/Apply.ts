import { Application } from "express";
import { Logger } from "pino";

import Context from "@/Inputs/HTTP/Middleware/Context";
import Headers from "@/Inputs/HTTP/Middleware/Headers";
import RequestLogging from "@/Inputs/HTTP/Middleware/Request-Logging";

const ApplyMiddleware = ({
  logger,
  app
}: {
  logger: Logger;
  app: Application;
}) => {
  /**
   * Ensure that all uses have access to the Context
   */
  app.use(Context({ logger: logger }));
  /**
   * Ensure that we set CORS and security headers
   */
  app.use(Headers());
  /**
   * We want to log each request we are given
   */
  app.use(RequestLogging());

  return app;
};

export default ApplyMiddleware;
