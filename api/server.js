import express from "express";
import { connect } from "./db/connectDb.js";
import dotenv from 'dotenv'
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;
const URI = process.env.MONGO_URI;

const startServer = async () => {
    try {
        await connect(URI);
        app.listen(PORT, console.log(`listening on ${PORT}`));
    } catch(e) {
        console.error(e.message);
    }
}
startServer();
