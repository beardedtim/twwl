import express from "express";
import { Logger } from "pino";

interface Context {
  log: Logger;
}

declare global {
  namespace Express {
    interface Request {
      context: Context;
    }
  }
}

export default ({ logger }: { logger: Logger }): express.RequestHandler => (
  req,
  _,
  next
) => {
  req.context = {
    log: logger
  };

  return next();
};
