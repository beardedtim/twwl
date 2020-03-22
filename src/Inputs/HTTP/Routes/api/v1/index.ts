import express from "express";
import SeriesRouter from "./series";
import Episodes from "./episodes";

const V1_API = express.Router();

V1_API.use("/series", SeriesRouter);
V1_API.use("/episodes", Episodes);

export default V1_API;
