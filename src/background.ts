// import axios from "axios";
// import dotenv from "dotenv";

// // Load env variables
// dotenv.config();

// const POLLING_INTERVAL = 10000; // 10 seconds
// const STOCK_SYMBOLS = ["RELIANCE", "TCS", "HDFCBANK"]; // Replace with your list
// const API_URL = process.env.STOCK_API_URL || "";
// const API_KEY = process.env.STOCK_API_KEY || "";

// async function fetchStockPrice(symbol: string) {
//     try {
//         const response = await axios.get(`${API_URL}/price`, {
//             params: {
//                 symbol,
//                 apikey: API_KEY,
//             },
//         });

//         const price = response.data?.price;
//         console.log(`[${new Date().toISOString()}] ${symbol}: ₹${price}`);
//         // You can save this to your DB if needed
//     } catch (err: any) {
//         console.error(`Error fetching ${symbol}:`, err.message);
//     }
// }

// function startPolling() {
//     setInterval(() => {
//         console.log("⏳ Polling stock prices...");
//         STOCK_SYMBOLS.forEach(fetchStockPrice);
//     }, POLLING_INTERVAL);
// }

// console.log("📡 Background worker started: Stock price polling");
// startPolling();


import startFetchLiveDataWorker from "./workers/fetchLiveData";


console.log("📡 Background worker started");
startFetchLiveDataWorker();
