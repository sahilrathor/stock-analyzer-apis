import axios from "axios";
import { Request, Response } from "express";
import envConfig from "../../config/envConfig";

const { UPSTOX_API_KEY, UPSTOX_API_SECRET, UPSTOX_REDIRECT_URI, UPSTOX_BASE_URL } = envConfig;


class loginService {
    static async login(req: Request, res: Response) {
        const authUrl = `${UPSTOX_BASE_URL}/login/authorization/dialog?client_id=${UPSTOX_API_KEY}&redirect_uri=${UPSTOX_REDIRECT_URI}&response_type=code`;
        res.redirect(authUrl);
    }


    static async callback(req: Request, res: Response) {
        if (!UPSTOX_API_KEY || !UPSTOX_API_SECRET || !UPSTOX_REDIRECT_URI) {
            throw new Error("Environment variables not found");
        }

        const code: string = req.query.code as string;
        if (!code) {
            return res.status(400).send("No code received");
        }

        try {
            const payload = new URLSearchParams();
            payload.append("code", code);
            payload.append("client_id", UPSTOX_API_KEY);
            payload.append("client_secret", UPSTOX_API_SECRET);
            payload.append("redirect_uri", UPSTOX_REDIRECT_URI);
            payload.append("grant_type", "authorization_code");
    
            const response = await axios.post(
                `${UPSTOX_BASE_URL}/login/authorization/token`,
                payload.toString(),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );
    
            const { access_token } = response.data;
            res.cookie("token", access_token, {
                httpOnly: true,
                secure: true,
                // sameSite: "strict",
                maxAge: 60 * 60 * 1000 * 24,
            });
            // console.log("Access Token:", access_token);
            res.send("Token received. You can now fetch holdings and live data.");
        } catch (error: any) {
            console.error("Error getting token", error.response?.data || error.message);
            res.status(500).send("Failed to authenticate.");
        }
    }
}


export default loginService;