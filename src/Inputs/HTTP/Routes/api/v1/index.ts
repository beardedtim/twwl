import express from "express";

const V1_API = express.Router();

V1_API.get("/", (req, res) => {
  res.json({
    data: true
  });
});

export default V1_API;
