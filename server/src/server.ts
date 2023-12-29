import mongoose from "mongoose";
import { app } from './app'

const connect = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(
      "mongodb+srv://heinan:vcMs4TfvvgC1rgp6@videoshack.0itjtom.mongodb.net/videoshack?retryWrites=true&w=majority"
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