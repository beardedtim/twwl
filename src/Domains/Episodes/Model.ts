import Mongoose from "mongoose";
import Config from "@/Domains/Episodes/Config";
import { IEpisode } from "@/Domains/Episodes/Types";

const EpisodeSchema = new Mongoose.Schema<IEpisode>(
  {
    title: String,
    description: String,
    last_updated: String,
    created_at: String,
    series_id: Mongoose.SchemaTypes.ObjectId,
    status: String,
    links: [
      {
        link_type: String,
        label: String,
        href: String
      }
    ]
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

const EpisodeModel = Mongoose.model("Episode", EpisodeSchema);

export const Schema = EpisodeSchema;
export const Model = EpisodeModel;

export default EpisodeModel;
