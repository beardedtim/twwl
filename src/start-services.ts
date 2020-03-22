import HTTPServer from "@/Inputs/HTTP/Server";
import GQLServer from "@/Inputs/GraphQL/Server";
import createLog from "@/Outputs/Logger";

const http_server = new HTTPServer();
const gql_server = new GQLServer();

const log = createLog({
  name: "__TWWL_MONO_SERVICE__",
  level: "debug",
  pretty: true
});

http_server.start(() => {
  log.info("HTTP Service Has Started");
});

gql_server.start(() => {
  log.info("GQL Service Has Started");
});

process.on("uncaughtException", e => {
  log.fatal({ error: e }, "UNCAUGHT EXCEPTION. SHUTTING DOWN");

  http_server.stop(() => {
    process.exit(1);
  });
});

process.on("unhandledRejection", e => {
  log.fatal({ error: e }, "UNHANDLED REJECTION. SHUTTING DOWN");
  http_server.stop(() => {
    process.exit(1);
  });
});
