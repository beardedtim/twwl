import { Document } from "mongoose";

/**
 * These are the values that you can read
 * from a Series
 */
export interface ISeries {
  id: string;
  title: string;
  description: string;
  created_at: string;
  last_updated: string;
}

/**
 * When we talk about a Series, we are really
 * talking about the Mongoose Document
 * that has the properties that we want
 */
export type Series = Document & ISeries;
