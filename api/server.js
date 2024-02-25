import express from "express";
import { URI, PORT } from "./config/config.js";
import { connect } from "./db/connectDb.js";
import userRouter from './routes/user.routes.js'
const app = express();
app.use(express.json());


//routes
app.use('/api/v1/sign-up', userRouter)

const startServer = async () => {
  try {
    await connect(URI);
    app.listen(PORT, console.log(`listening on ${PORT}`));
  } catch (e) {
    console.error(e.message);
  }
};
startServer();
