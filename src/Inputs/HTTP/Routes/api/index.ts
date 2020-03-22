import express from "express";

import V1_Routes from "./v1";

const API_Routes = express.Router();

API_Routes.use(`/v1`, V1_Routes);

export default API_Routes;
