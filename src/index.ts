import express, { Request, Response } from "express";
import dotenv from "dotenv";
import envConfig from "./config/envConfig";
import figletText from "./utils/figlet";
import routerConfig from "./config/routerConfig";
import { corsMiddleware } from "./middlewares/cors";
import sendTelegramMessage from "./utils/sendMessage";
import cookieParser from "cookie-parser";
import dbConnect from "./db/dbConnect";
import "./types/express"

dotenv.config();
const app = express();
const PORT = envConfig.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(corsMiddleware);

app.use("", routerConfig);

app.get("/", (req: Request, res: Response) => {
    res.send("Stock Analyzer - APIs");
});

app.listen(PORT, () => {
    console.log(figletText);
    console.log(`Server is running on http://localhost:${PORT}`);
    dbConnect;
    sendTelegramMessage({ text: "Server is running" });
});
