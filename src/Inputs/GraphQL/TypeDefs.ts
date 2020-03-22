import { gql } from "apollo-server";

const typeDefs = gql`
  scalar Date
  scalar Time
  scalar DateTime
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  type EpisodeLink {
    type: String!
    label: String!
    href: String!
  }

  type Episode {
    _id: ID!
    title: String
    description: String
    links: [EpisodeLink]
    series: Series!
  }

  type Series {
    title: String
    description: String
    created_at: DateTime
    last_updated: DateTime
    episodes: [Episode]
    _id: ID!
  }

  type Query {
    series: [Series]
  }
`;

export default typeDefs;
