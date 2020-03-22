import Server from "@/Inputs/HTTP/Server";
import createLog from "@/Common/Logger";

const server = new Server();

const log = createLog({
  name: "__TWWL_MONO_SERVICE__",
  level: "debug",
  pretty: true
});

server.start(() => {
  log.info("Service Has Started");
});

process.on("uncaughtException", e => {
  log.fatal({ error: e }, "UNCAUGHT EXCEPTION. SHUTTING DOWN");

  server.stop(() => {
    process.exit(1);
  });
});

process.on("unhandledRejection", e => {
  log.fatal({ error: e }, "UNHANDLED REJECTION. SHUTTING DOWN");
  server.stop(() => {
    process.exit(1);
  });
});
