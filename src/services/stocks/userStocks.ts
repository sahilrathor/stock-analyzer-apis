import { Request, Response } from "express";
import pool from "../../db/dbConnect";

class UserStockService {
    static async addStock(req: Request, res: Response) {
        const { stockId, quantity, buyPrice } = req.body;
        const userId = req.user?.id;

        if (!stockId || !quantity || !buyPrice) {
            return res.status(400).json({ message: "Missing field" });
        }

        if (!userId) {
            return res.status(400).json({ message: "invalid token" });
        }

        const alreadyExists = await pool.query(
            "SELECT quantity, average_buy_price FROM user_stocks WHERE user_id = $1 AND stock_id = $2",
            [userId, stockId]
        );

        try {
            if (alreadyExists.rowCount !== 0) {
                const prevData = alreadyExists.rows[0];
                const currentBuyPrice = quantity * buyPrice;
                const prevBuyPrice = prevData.quantity * prevData.average_buy_price;
                const totalQuantity = Number(quantity) + Number(prevData.quantity);
                const averageBuyPrice = (currentBuyPrice + prevBuyPrice) / totalQuantity;

                await pool.query(
                    "UPDATE user_stocks SET quantity = $1, average_buy_price = $2 WHERE user_id = $3 AND stock_id = $4",
                    [totalQuantity, averageBuyPrice, userId, stockId]
                );

                return res.status(201).json({
                    message: "Stock updated successfully",
                });
            }
            if (alreadyExists.rowCount === 0) {
                await pool.query(
                    "INSERT INTO user_stocks (user_id, stock_id, quantity, average_buy_price) VALUES ($1, $2, $3, $4)",
                    [userId, stockId, quantity, buyPrice]
                );

                return res.status(201).json({
                    message: "Stock added successfully",
                });
            }
        } catch (error: any) {
            console.log("addStock error:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static async removeStock(req: Request, res: Response) {
        const stockId = req.params.stockId;
        const sellQuantity = req.body.quantity;
        const userId = req.user?.id;

        
        
        if (!userId) {
            return res.status(400).json({ message: "invalid token" });
        }

        if (!stockId) {
            return res.status(400).json({ message: "missing field: stockId" });
        }

        const isExists = await pool.query("SELECT id, quantity FROM user_stocks WHERE stock_id = $1 AND user_id = $2", [
            stockId,
            userId,
        ]);

        if (isExists.rowCount === 0) {
            return res.status(400).json({ message: "Stock not found" });
        }
        
        try {
            // IT WILL DELETE COMPLETE QUANTITY
            if (!sellQuantity || (sellQuantity && sellQuantity >= isExists.rows[0].quantity)) {
                await pool.query("DELETE FROM user_stocks WHERE stock_id = $1 AND user_id = $2", [stockId, userId]);
                return res.status(200).json({ message: "Stock deletd successhully" });
            }
            
            // DELETE SPECIFIC NO. OF STOCKS
            if (sellQuantity && sellQuantity < isExists.rows[0].quantity) {
                const prevData = isExists.rows[0];
                const newQuantity = prevData.quantity - sellQuantity;

                await pool.query("UPDATE user_stocks SET quantity = $1 WHERE user_id = $2 AND stock_id = $3", [
                    newQuantity,
                    userId,
                    stockId,
                ]);

                return res.status(201).json({
                    message: "Stock updated successfully",
                });
            }
        } catch (error) {
            console.log("removeStock error:", error);
            return res.status(200).json({ message: "Internal Server Error" });
        }
    }

    static async getStocks(req: Request, res: Response) {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(400).json({ message: "invalid token" });
        }
        try {
            const result = await pool.query("SELECT * FROM user_stocks WHERE user_id = $1", [userId]);
            res.status(200).json({
                message: "Stocks fetched successfully",
                stocksCount: result.rowCount,
                stocks: result.rows,
            });
        } catch (error: any) {
            console.log("getStocks error:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

export default UserStockService;
