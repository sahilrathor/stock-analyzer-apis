import {Request, Response} from "express";
import axios from "axios";


const BASE_URL = "https://api.upstox.com/v2";

const headers = (token: string) => ({
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    "Content-Type": "application/json",
});

class upstoxService {
    static async getProfile (req: Request, res: Response) {
        // console.log('cookies:', req.cookies);
        const token = req.cookies.token;
        if(!token || token === ""){
            return res.status(401).json({ message: "Unauthorized" });
        }


        try {
            const response = await axios.get(`${BASE_URL}/user/profile`, { headers: headers(token) });
            return res.send(response.data.data);
        } catch (error: any) {
            console.error("Error fetching profile:", error.response?.data || error.message);
            throw new Error("Failed to fetch profile.");
        }
    };

    static async getHoldings (req: Request, res: Response) {
        const token = req.cookies.token;
        try {
            const response = await axios.get(`${BASE_URL}/portfolio/long-term-holdings`, { headers: headers(token) });
            return res.send(response.data.data);
        } catch (error: any) {
            console.error("Error fetching holdings:", error.response?.data || error.message);
            throw new Error("Failed to fetch holdings.");
        }
    };

    static async getNSEQuote (req: Request, res: Response) {
        const token = req.cookies.token;
        const symbol = req.params.symbol;
        try {
            const response = await axios.get(`${BASE_URL}/market/quote/nse/${symbol}`, { headers: headers(token) });
            return res.send(response.data.data);
        } catch (error: any) {
            console.error("Error fetching NSE quote:", error.response?.data || error.message);
            throw new Error("Failed to fetch NSE quote.");
        }
    };

    static async getOHLC (req: Request, res: Response) {
        console.log(req.params || 'asdf');
        const token = req.cookies.token;
        const instrumentToken = req.params.instrumentToken;
        try {
            const response = await axios.get(`${BASE_URL}/market/quote/ohlc/${instrumentToken}`, {
                headers: headers(token),
            });
            return res.send(response.data.data);
        } catch (error: any) {
            console.error("Error fetching OHLC:", error.response?.data || error.message);
            throw new Error("Failed to fetch OHLC data.");
        }
    };
}

export default upstoxService;
