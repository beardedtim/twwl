import Server from "@/Inputs/HTTP/Server";

const server = new Server();

server.start(() => {
  server.log.info("Service Has Started");
});
