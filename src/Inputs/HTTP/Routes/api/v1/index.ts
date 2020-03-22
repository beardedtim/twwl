import express from "express";
import SeriesRouter from "./series";

const V1_API = express.Router();

V1_API.use("/series", SeriesRouter);

export default V1_API;
