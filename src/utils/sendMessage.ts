import axios from "axios";
import envConfig from "../config/envConfig";
import { TelegramMessageInterface, TelegramMessagePayloadInterface } from "../types/telegramMessageInterface";

const BOT_TOKEN = envConfig.TELEGRAM_BOT_TOKEN;
const CHAT_ID = envConfig.TELEGRAM_CHAT_ID;


const sendTelegramMessage = async (message: TelegramMessageInterface) => {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    if (!BOT_TOKEN || !CHAT_ID) {
        console.error("Telegram bot token or chat ID not found");
        return;
    }

    if (!message.text) {
        console.error("Message not found");
        return;
    }

    const payload: TelegramMessagePayloadInterface = {
        chat_id: CHAT_ID,
        text: message.text,
        parse_mode: message.parse_mode || "MarkdownV2",
        reply_markup: message.reply_markup || undefined
    }


    try {
        const res = await axios.post(url, payload);
        // console.log("Message sent:", res.data);
    } catch (error: any) {
        console.error("Error sending Telegram message:", error.response?.data || error.message);
    }
};

export default sendTelegramMessage;
