import { skip, combineResolvers } from "graphql-resolvers";
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from "graphql-iso-date";
import { Context } from "@/Inputs/GraphQL/Types";

const logRequest = (msg: string) => (
  root: any,
  args: any,
  { log }: Context,
  info: any
) => {
  log.trace({ root, args, info, msg });
  return skip;
};

const resolvers = {
  Query: {
    series: combineResolvers(
      logRequest("Query::Series"),
      (_: any, __: any, { repos }: Context) => {
        const repo = repos.series;

        return repo.getSeries("");
      }
    )
  },
  Series: {
    episodes: combineResolvers(
      logRequest("Query::Series::Episodes"),
      ({ _id }, _: any, { repos }: Context) => {
        const repo = repos.episode;

        return repo.getEpisodesBySeriesId(_id);
      }
    )
  },
  Episode: {
    series: ({ series_id }: any, _: any, { loaders }: Context) => {
      return loaders.series.load(series_id);
    }
  },
  EpisodeLink: {
    type: ({ link_type }: any) => link_type
  },
  Date: GraphQLDate,
  Time: GraphQLTime,
  DateTime: GraphQLDateTime
};

export default resolvers;
