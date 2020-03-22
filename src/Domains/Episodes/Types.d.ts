import { Document } from "mongoose";

export interface IEpisode {
  id: string;
  title: string;
  description: string;
  created_at: string;
  last_updated: string;
  series_id: string;
  links: {
    link_type: string;
    label: string;
    href: string;
  }[];
}

export type Episode = Document & IEpisode;
