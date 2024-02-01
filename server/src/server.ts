import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { app } from "./app";

// Retrieve MongoDB credentials from environment variables
const credentials = process.env.CREDENTIALS;
if (!credentials) {
  throw new Error("The CREDENTIALS environment variable is not defined.");
}

// Connect to MongoDB using Mongoose
const connect = async () => {
  try {
    mongoose.set("strictQuery", true); // Enable strict mode for queries

    // Connect to the MongoDB cluster
    await mongoose.connect(
      `mongodb+srv://${credentials}@videoshack.0itjtom.mongodb.net/videoshack?retryWrites=true&w=majority`
    );

    // Event handlers for connection errors and successful connection
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

// Invoke the connect function to establish a connection to MongoDB
connect();

// Start the Express server on port 3000
app.listen(3000, () => console.log("server is up"));
