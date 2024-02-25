import mongoose from "mongoose";

 export const connect = async (mongo_uri) => {
    await mongoose.connect(mongo_uri);
    console.log('connection established');
}



