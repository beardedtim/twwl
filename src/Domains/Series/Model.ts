import Mongoose from "mongoose";
import Config from "@/Domains/Series/Config";
import { ISeries } from "@/Domains/Series/Types";

const SeriesSchema = new Mongoose.Schema<ISeries>(
  {
    title: String,
    description: String,
    last_updated: String,
    created_at: String
  },
  {
    strict: Config.IS_PRODUCTION,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "last_updated",
      // @ts-ignore
      currentTime: () => new Date().toISOString()
    }
  }
);

const SeriesModel = Mongoose.model("Series", SeriesSchema);

export const Schema = SeriesSchema;
export const Model = SeriesModel;

export default SeriesModel;
