import { v4 as uuid } from "uuid";

export default (): any => (req: any, res: any, next: any) => {
  const id = uuid();
  res.set("X-Req-ID", id);
  req.id = id;

  const start = Date.now();

  const onFinished = (err: Error) => {
    if (res.statusCode >= 500 || err) {
      return onErrored(err);
    }

    res.removeListener("finish", onFinished);
    res.removeListener("error", onErrored);

    req.context.log.info({
      res,
      response_time: Date.now() - start + "ms"
    });
  };

  const onErrored = (err: Error) => {
    res.removeListener("finish", onFinished);
    res.removeListener("error", onErrored);

    req.context.log.info(
      {
        res,
        err: err || new Error("failed with status code " + res.statusCode),
        responseTime: Date.now() - start
      },
      "request errored"
    );
  };

  res.on("finish", onFinished);

  return next();
};
