import Mongoose from "mongoose";

export default (uri: string, model: string) => {
  const connection = Mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  return connection.model(model);
};
