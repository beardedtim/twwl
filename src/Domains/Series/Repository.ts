import { Model } from "mongoose";
import { Series } from "@/Domains/Series/Types";
import Config from "@/Domains/Series/Config";
import ConnectAndGetModel from "@/Utils/mongoose/ConnectAndGetModel";
import { Logger } from "pino";
import createLogger from "@/Outputs/Logger";

import "@/Domains/Series/Model";

interface SeriesCreation {
  title: string;
  description: string;
}

interface SeriesUpdate {
  title?: string;
  description?: string;
}

type DataStore = Model<Series>;

class SeriesRepository {
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
      "Series"
    ) as DataStore;
  }

  getSeries(query: string) {
    this.#log.trace({ query }, "Getting Series with query");

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

  getSeriesById(id: string) {
    this.#log.trace({ id }, "Getting Series by ID");

    return this.#connection.findById(id).lean().exec();
  }

  createSeries(series: SeriesCreation) {
    this.#log.trace({ series }, "Created Series");

    const created = new this.#connection(series);
    return created.save();
  }

  updateSeries(id: string, update: SeriesUpdate) {
    this.#log.trace({ update, id }, "Updating Series by ID");

    return this.#connection
      .findByIdAndUpdate(id, update, { new: true, upsert: true })
      .lean()
      .exec();
  }

  deleteSeries(id: string) {
    this.#log.trace({ id }, "Deleting Series by ID");

    return this.#connection.findByIdAndDelete(id).lean().exec();
  }
}

export default SeriesRepository;
