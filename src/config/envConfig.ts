import { EnvInterface } from "../types/envInterface";
import dotenv from "dotenv";

dotenv.config();

const envConfig: EnvInterface = {
    PORT: Number(process.env.PORT) || 5000,
    JWT_SECRET: process.env.JWT_SECRET || "secret",
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN || "",
    TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID || "",
};

export default envConfig;
