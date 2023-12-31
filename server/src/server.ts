import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
import { app } from './app'

const credentials = process.env.CREDENTIALS
if (!credentials) {
    throw new Error('The CREDENTIALS environment variable is not defined.');
}

const connect = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(
      `mongodb+srv://${credentials}@videoshack.0itjtom.mongodb.net/videoshack?retryWrites=true&w=majority`
    );
    mongoose.connection.on("error", () => {
      console.error("error");
    });
    mongoose.connection.once("error", () => {
      console.log("server connect");
    });
    console.log("ok");
  } catch (error) {
    console.error(error);
  }
};

connect();

app.listen(3000, () => console.log('server is up'))