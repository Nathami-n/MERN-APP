import express from "express";
import { URI, PORT } from "./config/config.js";
import { connect } from "./db/connectDb.js";
import userRouter from "./routes/user.routes.js";
import { logger } from "./middleware/EventLogger.js";
import {corsOptionsDelegate} from './config/cors.js'
import cors from 'cors'
import { errorLogger } from "./middleware/Errormiddleware.js";
const app = express();
//middleware
app.use(express.json());
app.use(logger);
app.use(cors(corsOptionsDelegate))

//routes
app.use("/api/v1/sign-up", userRouter);

const startServer = async () => {
  try {
    await connect(URI);
    app.listen(PORT, console.log(`listening on ${PORT}`));
  } catch (e) {
    console.error(e.message);
  }
};
startServer();

app.use(errorLogger);
