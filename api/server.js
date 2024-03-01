import express from "express";
import { URI, PORT } from "./config/config.js";
import { connect } from "./db/connectDb.js";
import userAuthRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoutes.js";
import { logger } from "./middleware/EventLogger.js";
import { corsOptionsDelegate } from "./config/cors.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import "express-async-errors";
import { errorLogger } from "./middleware/ErrorMiddleware.js";
const app = express();
//middleware
app.use(express.json());
app.use(cors(corsOptionsDelegate));
app.use(logger);
app.use(cookieParser());
app.use(errorLogger);

//routes
app.use("/api/v1", userAuthRoute);
app.use("/", userRoute);

const startServer = async () => {
  try {
    await connect(URI);
    app.listen(PORT, console.log(`listening on ${PORT}`));
  } catch (e) {
    console.error(e.message);
  }
};
startServer();


