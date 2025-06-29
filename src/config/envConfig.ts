import { EnvInterface } from "../types/envInterface";
import dotenv from "dotenv";

dotenv.config();

const envConfig: EnvInterface = {
    PORT: Number(process.env.PORT),
    JWT_SECRET: process.env.JWT_SECRET || "secret",
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN || "",
    TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID || "",
    UPSTOX_API_KEY: process.env.UPSTOX_API_KEY || "",
    UPSTOX_API_SECRET: process.env.UPSTOX_API_SECRET || "",
    UPSTOX_REDIRECT_URI: process.env.UPSTOX_REDIRECT_URI || "",
    UPSTOX_BASE_URL: process.env.UPSTOX_BASE_URL || "https://api.upstox.com/v2",

    PG_HOST: process.env.PG_HOST || "localhost",
    PG_PORT: Number(process.env.PG_PORT) || 5432,
    PG_DATABASE: process.env.PG_DATABASE || "postgres",
    PG_USER: process.env.PG_USER || "postgres",
    PG_PASSWORD: process.env.PG_PASSWORD || "postgres",
};

export default envConfig;
