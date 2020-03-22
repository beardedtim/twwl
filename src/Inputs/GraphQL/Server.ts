import { ApolloServer, gql, ServerInfo } from "apollo-server";

import { GraphQLDate, GraphQLTime, GraphQLDateTime } from "graphql-iso-date";
import { skip, combineResolvers } from "graphql-resolvers";

import Config from "@/Inputs/GraphQL/Config";
import { Logger } from "pino";
import Log from "./Logger";

const typeDefs = gql`
  scalar Date
  scalar Time
  scalar DateTime
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type Series {
    title: String
    description: String
    created_at: DateTime
    last_updated: DateTime
    _id: ID!
  }

  type Query {
    series: [Series]
  }
`;

const series = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    description: "J.K. Rowling"
  },
  {
    title: "Jurassic Park",
    description: "Michael Crichton"
  }
];

const logRequest = (msg: string) => (
  root: any,
  args: any,
  { log }: any,
  info: any
) => {
  log.trace({ root, args, info, msg });
  return skip;
};

const resolvers = {
  Query: {
    series: combineResolvers(logRequest("Query::Series"), () => series)
  },
  Date: GraphQLDate,
  Time: GraphQLTime,
  DateTime: GraphQLDateTime
};

class Server {
  #server: ApolloServer;
  #serverInfo?: ServerInfo;
  #log: Logger;

  constructor({ log }: { log?: Logger } = {}) {
    this.#log = log || Log;

    this.#server = new ApolloServer({
      typeDefs,
      resolvers,
      context: (ctx: any) => this.context(ctx)
    });
  }

  context = (_: any) => ({ log: this.#log });

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
