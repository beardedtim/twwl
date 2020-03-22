import { Router } from "express";
import bodyParser from "body-parser";
import SeriesRepository from "@/Domains/Series/Repository";

const Route = Router();

const Repo = new SeriesRepository();

Route.get("/", async (req, res) => {
  const data = await Repo.getSeries(req.query.query || "");

  res.json({
    data
  });
})
  .post("/", bodyParser.json(), async (req, res) => {
    const data = await Repo.createSeries(req.body);

    res.status(201).json({ data });
  })
  .get("/:id", async (req, res) => {
    const data = await Repo.getSeriesById(req.params.id);

    res.json({
      data
    });
  })
  .patch("/:id", bodyParser.json(), async (req, res) => {
    const data = await Repo.updateSeries(req.params.id, req.body);

    res.json({
      data
    });
  });

export default Route;
