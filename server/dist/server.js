"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = require("./app");
// Retrieve MongoDB credentials from environment variables
const credentials = process.env.CREDENTIALS;
if (!credentials) {
    throw new Error("The CREDENTIALS environment variable is not defined.");
}
// Connect to MongoDB using Mongoose
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        mongoose_1.default.set("strictQuery", true); // Enable strict mode for queries
        // Connect to the MongoDB cluster
        yield mongoose_1.default.connect(`mongodb+srv://${credentials}@videoshack.0itjtom.mongodb.net/videoshack?retryWrites=true&w=majority`);
        // Event handlers for connection errors and successful connection
        mongoose_1.default.connection.on("error", () => {
            console.error("error");
        });
        mongoose_1.default.connection.once("error", () => {
            console.log("server connect");
        });
        console.log("ok");
    }
    catch (error) {
        console.error(error);
    }
});
// Invoke the connect function to establish a connection to MongoDB
connect();
// Start the Express server on port 3000
app_1.app.listen(3000, () => console.log("server is up"));
