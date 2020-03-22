import { Router } from "express";
import bodyParser from "body-parser";
import EpisodeRepository from "@/Domains/Episodes/Repository";

const Route = Router();

const Repo = new EpisodeRepository();

Route.get("/", async (req, res) => {
  const data = await Repo.getEpisodes(req.query.query || "");

  res.json({
    data
  });
})
  .post("/", bodyParser.json(), async (req, res) => {
    console.dir(req.body);
    const data = await Repo.createEpisode(req.body);

    res.status(201).json({ data });
  })
  .get("/:id", async (req, res) => {
    const data = await Repo.getEpisodeById(req.params.id);

    res.json({
      data
    });
  })
  .patch("/:id", bodyParser.json(), async (req, res) => {
    const data = await Repo.updateEpisode(req.params.id, req.body);

    res.json({
      data
    });
  })
  .delete("/:id", async (req, res) => {
    const data = await Repo.deleteEpisode(req.params.id);

    res.json({
      data
    });
  });

export default Route;
