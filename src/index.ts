import express, { Request, Response } from "express";
import dotenv from "dotenv";
import envConfig from "./config/envConfig";
import figletText from "./utils/figlet";
import routerConfig from "./config/routerConfig";
import { corsMiddleware } from "./middlewares/cors";
import sendTelegramMessage from "./utils/sendMessage";
import cookieParser from "cookie-parser";
import "./types/express";
import { connectDb } from "./db/dbConnect";

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
    connectDb();
    {
        !envConfig.IS_DEV && sendTelegramMessage({ 
            text: "Server started successfully",
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "GO TO DASHBOARD",
                            url: envConfig.DASHBOARD_URL,
                        },
                    ],
                    [
                        {
                            text: "GO TO APIS",
                            url: envConfig.APIS_URL,
                        },
                    ],
                ],
            }
        });
    }
});
