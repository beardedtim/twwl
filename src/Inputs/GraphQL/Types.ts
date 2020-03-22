import SeriesRepo from "@/Domains/Series/Repository";
import EpisodeRepo from "@/Domains/Episodes/Repository";
import { Logger } from "pino";
import DataLoader from "dataloader";

export interface Repos {
  series: SeriesRepo;
  episode: EpisodeRepo;
}

export interface Context {
  log: Logger;
  repos: Repos;
  loaders: {
    [x: string]: DataLoader<any, any, any>;
  };
}
