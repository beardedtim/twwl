import { ApolloServer, ServerInfo } from "apollo-server";

import EpisodeRepository from "@/Domains/Episodes/Repository";
import SeriesRepository from "@/Domains/Series/Repository";

import Config from "@/Inputs/GraphQL/Config";
import { Logger } from "pino";
import DataLoader from "dataloader";
import Log from "./Logger";
import resolvers from "./Resolvers";
import typeDefs from "./TypeDefs";

class Server {
  #server: ApolloServer;
  #serverInfo?: ServerInfo;
  #log: Logger;

  constructor({ log }: { log?: Logger } = {}) {
    this.#log = log || Log;

    this.#server = new ApolloServer({
      typeDefs,
      resolvers,
      cors: true,
      onHealthCheck: async req => {
        this.#log.trace("Healthy!");
        return true;
      },
      context: (ctx: any) => this.context(ctx)
    });
  }

  context = (_: any) => {
    const seriesRepo = new SeriesRepository();
    const episodeRepo = new EpisodeRepository();

    const loaders = {
      series: new DataLoader((keys: readonly string[]) =>
        seriesRepo.batchGetById(keys)
      ),
      episode: new DataLoader((keys: readonly string[]) =>
        episodeRepo.batchGetByIds(keys)
      )
    };

    const repos = {
      series: seriesRepo,
      episode: episodeRepo
    };

    return { log: this.#log, loaders, repos };
  };

  start(cb: () => void) {
    this.#server.listen(Config.PORT).then(serverInfo => {
      this.#serverInfo = serverInfo;

      return cb();
    });
  }

  stop(cb: () => void) {
    if (this.#serverInfo) {
      return cb();
    }
  }
}

export default Server;
