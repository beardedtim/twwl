import Repository from "./Repository";
import mockingoose from "mockingoose";

import SeriesModel from "./Model";

describe("Repository", () => {
  afterEach(() => {
    mockingoose.resetAll();
  });

  it("saves a Series", async () => {
    const series = {
      title: "Title",
      description: "My Description"
    };

    mockingoose(SeriesModel).toReturn(series);

    const repo = new Repository();

    const saved = await repo.createSeries(series);

    expect(saved.title).toBe(series.title);
    expect(saved.description).toBe(series.description);
    expect(saved._id).toBeDefined();
  });

  it("deletes a series", async () => {
    const series = {
      _id: "507f191e810c19729de860ea",
      title: "Title",
      description: "My Description"
    };

    mockingoose(SeriesModel).toReturn(series, "findOneAndDelete");

    const repo = new Repository();

    const saved = await repo.deleteSeries(series._id);
    // Ignoring TS because Jest yells when you use
    // saved?.title and I don't feel like messing
    // with it to make it understand TS better.

    // @ts-ignore
    expect(saved.title).toBe(series.title);
    // @ts-ignore
    expect(saved.description).toBe(series.description);
  });

  it("returns a series by ID", async () => {
    const series = {
      _id: "507f191e810c19729de860ea",
      title: "Title",
      description: "My Description"
    };

    mockingoose(SeriesModel).toReturn(series, "findOne");

    const repo = new Repository();

    const found = await repo.getSeriesById(series._id);
    // Ignoring TS because Jest yells when you use
    // found?.title and I don't feel like messing
    // with it to make it understand TS better.
    // @ts-ignore
    expect(found.title).toBe(series.title);
    // @ts-ignore
    expect(found.description).toBe(series.description);
  });
});
