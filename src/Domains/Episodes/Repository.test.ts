import Repository from "./Repository";
import mockingoose from "mockingoose";

import EpisodeModel from "./Model";

describe("Repository", () => {
  afterEach(() => {
    mockingoose.resetAll();
  });

  it("saves an Episode", async () => {
    const episode = {
      title: "Title",
      description: "My Description"
    };

    mockingoose(EpisodeModel).toReturn(episode);

    const repo = new Repository();

    const saved = await repo.createEpisode(episode);

    expect(saved.title).toBe(episode.title);
    expect(saved.description).toBe(episode.description);
    expect(saved._id).toBeDefined();
  });

  it("deletes a episode", async () => {
    const episode = {
      _id: "507f191e810c19729de860ea",
      title: "Title",
      description: "My Description"
    };

    mockingoose(EpisodeModel).toReturn(episode, "findOneAndDelete");

    const repo = new Repository();

    const saved = await repo.deleteEpisode(episode._id);

    // @ts-ignore
    expect(saved.title).toBe(episode.title);
    // @ts-ignore
    expect(saved.description).toBe(episode.description);
  });

  it("returns a episode by ID", async () => {
    const episode = {
      _id: "507f191e810c19729de860ea",
      title: "Title",
      description: "My Description"
    };

    mockingoose(EpisodeModel).toReturn(episode, "findOne");

    const repo = new Repository();

    const found = await repo.getEpisodeById(episode._id);

    // @ts-ignore
    expect(found.title).toBe(episode.title);
    // @ts-ignore
    expect(found.description).toBe(episode.description);
  });
});
