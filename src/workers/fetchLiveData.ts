import yahooFinance from "yahoo-finance2";
import dotenv from "dotenv";
import sendTelegramMessage from "../utils/sendMessage";
import { CronJob } from "cron";

dotenv.config();

const POLLING_INTERVAL = 10000;
const STOCK_SYMBOLS: string[] = ["RELIANCE.NS", "TCS.NS", "HDFCBANK.NS"];

async function fetchStockPrice(symbol: string) {
    try {
        const result = await yahooFinance.quote(symbol);
        const price = result.regularMarketPrice;

        console.log(`[${new Date().toLocaleString()}] ${symbol}: ₹${price}`);
        // You can save this to your DB if needed
    } catch (err: any) {
        console.error(`Error fetching ${symbol}:`, err.message || err);
    }
}

let pollingIntervalId: NodeJS.Timeout | null = null;

const startPolling = () => {
    if (pollingIntervalId) {
        console.log("Polling already running. Skipping.");
        return;
    }

    console.log("Starting Stock Price Polling...");

    pollingIntervalId = setInterval(() => {
        STOCK_SYMBOLS.forEach(fetchStockPrice);
    }, POLLING_INTERVAL);
};

const stopPolling = () => {
    if (pollingIntervalId) {
        clearInterval(pollingIntervalId);
        pollingIntervalId = null;
        console.log("Stock Price Polling Stopped...");
    }
};

// Start polling at 9:15 AM on weekdays
const startJob = new CronJob("0 15 9 * * 1-5", startPolling);

// Stop polling at 3:15 PM on weekdays
const stopJob = new CronJob("0 15 15 * * 1-5", stopPolling);

// Start the cron jobs

const startWorker = () => {
    startJob.start();
    stopJob.start();
}

export default startWorker;
