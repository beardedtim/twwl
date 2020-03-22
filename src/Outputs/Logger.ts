import createLogger from "pino";

export default ({
  name,
  level,
  pretty = false
}: {
  name: string;
  level: string;
  pretty?: boolean;
}) =>
  createLogger({
    name,
    level,
    serializers: createLogger.stdSerializers,
    ...(pretty && {
      prettyPrint: {
        levelFirst: true
      }
    })
  });
