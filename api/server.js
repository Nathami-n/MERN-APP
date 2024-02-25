import express from "express";
import { URI, PORT } from "./config/config.js";
import { connect } from "./db/connectDb.js";
const app = express();

const startServer = async () => {
  try {
    await connect(URI);
    app.listen(PORT, console.log(`listening on ${PORT}`));
  } catch (e) {
    console.error(e.message);
  }
};
startServer();
