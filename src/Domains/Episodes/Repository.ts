import { Model } from "mongoose";
import { Episode } from "@/Domains/Episodes/Types";
import Config from "@/Domains/Episodes/Config";
import ConnectAndGetModel from "@/Utils/mongoose/ConnectAndGetModel";
import { Logger } from "pino";
import createLogger from "@/Common/Logger";

import "@/Domains/Episodes/Model";

interface EpisodesCreation {
  title: string;
  description: string;
}

interface EpisodesUpdate {
  title?: string;
  description?: string;
}

type DataStore = Model<Episode>;

class EpisodesRepository {
  #connection: DataStore;
  #log: Logger;
  constructor() {
    this.#log = createLogger({
      name: Config.NAME,
      level: Config.LOG_LEVEL,
      pretty: true
    });

    this.#connection = ConnectAndGetModel(
      Config.MONGOOSE_URI,
      "Episode"
    ) as DataStore;
  }

  getEpisodes(query: string) {
    this.#log.trace({ query }, "Getting Episodes with query");

    return this.#connection
      .find()
      .or([
        {
          title: new RegExp(query, "i")
        },
        {
          description: new RegExp(query, "i")
        }
      ])
      .lean()
      .exec();
  }

  getEpisodeById(id: string) {
    this.#log.trace({ id }, "Getting Episodes by ID");

    return this.#connection.findById(id).lean().exec();
  }

  createEpisode(series: EpisodesCreation) {
    this.#log.trace({ series }, "Created Episodes");

    const created = new this.#connection(series);
    return created.save();
  }

  updateEpisode(id: string, update: EpisodesUpdate) {
    this.#log.trace({ update, id }, "Updating Episodes by ID");

    return this.#connection
      .findByIdAndUpdate(id, update, { new: true, upsert: true })
      .lean()
      .exec();
  }

  deleteEpisode(id: string) {
    this.#log.trace({ id }, "Deleting Episodes by ID");

    return this.#connection.findByIdAndDelete(id).lean().exec();
  }
}

export default EpisodesRepository;
