import { EnvInterface } from "../types/envInterface";
import dotenv from "dotenv";

dotenv.config();

const envConfig: EnvInterface = {
    PORT: Number(process.env.PORT) || 5000,
    JWT_SECRET: process.env.JWT_SECRET || "secret",
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN || "",
    TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID || "",
    UPSTOX_API_KEY: process.env.UPSTOX_API_KEY || "",
    UPSTOX_API_SECRET: process.env.UPSTOX_API_SECRET || "",
    UPSTOX_REDIRECT_URI: process.env.UPSTOX_REDIRECT_URI || "",
    UPSTOX_BASE_URL: process.env.UPSTOX_BASE_URL || "https://api.upstox.com/v2",
};

export default envConfig;
