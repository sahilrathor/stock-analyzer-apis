import { Request, Response } from "express";
import pool from "../../db/dbConnect";
import yFinance from "../../external-services/yahoo-finance/yahooFinance";

class UserStockService {
    static async addStock(req: Request, res: Response) {
        const { stockId, quantity, buyPrice } = req.body;
        const userId = 1;

        if (!stockId || !quantity || !buyPrice  ) {
            return res.status(400).json({ message: "Missing field" });
        }


        const averageBuyPrice = buyPrice;

        try {
            await pool.query(
                "INSERT INTO user_stocks (userId, stockId, quantity, averageBuyPrice) VALUES ($1, $2, $3, $4)",
                [userId, stockId, quantity, averageBuyPrice]
            );

            return res.status(201).json({
                message: "Stock added successfully",
            });
        } catch (error: any) {
            console.log("addStock error:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static async removeStock(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "missing field: id" });
        }

        const isExists = await pool.query("SELECT id FROM stocks WHERE id = $1", [id]);

        if (isExists.rowCount === 0) {
            return res.status(400).json({ message: "Stock not found" });
        }

        try {
            await pool.query("DELETE FROM stocks WHERE id = $1", [id]);

            return res.status(200).json({ message: "Stock deletd successhully" });
        } catch (error) {
            console.log("removeStock error:", error);
            return res.status(200).json({ message: "Internal Server Error" });
        }
    }

    static async getQuoteinfo(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "missing field: id" });
        }

        const result = await pool.query("SELECT symbol FROM stocks WHERE id = $1", [id])
        // console.log('res:', result)
        const symbol = result.rows[0].symbol


        try {
            const result = await yFinance.quoteSymbol(symbol as string);
            // console.log('yfin:', result)
            return res.status(200).json({ result: result });
        } catch (error) {
            console.log("getQuoteInfo error:", error);
            return res.status(200).json({ message: "Internal Server Error" });
        }
    }
}

export default UserStockService;
