import { Request, Response } from "express";
import pool from "../../db/dbConnect";
import yFinance from "../../external-services/yahoo-finance/yahooFinance";

class StockService {
    static async getStocks(req: Request, res: Response) {
        try {
            const result = await pool.query("SELECT id, name, symbol, exchange, sector, industory FROM stocks");
            return res.status(200).json({
                message: "Stocks fetched successfully",
                stocksCount: result.rowCount,
                stocks: result.rows,
            });
        } catch (error: any) {
            console.log("searchStock error:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static async searchStock(req: Request, res: Response) {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ message: "Missing query" });
        }
        try {
            const result = await yFinance.searchSymbol(query as string);
            return res.status(200).json({ result: result });
        } catch (error: any) {
            console.log("searchStock error:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static async addStock(req: Request, res: Response) {
        const { name, symbol, exchange, sector, industory } = req.body;

        if (!name || !symbol) {
            return res.status(400).json({ message: "Missing field" });
        }

        try {
            await pool.query(
                "INSERT INTO stocks (name, symbol, exchange, sector, industory) VALUES ($1, $2, $3, $4, $5)",
                [name, symbol, exchange || "", sector || "", industory || ""]
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

        const result = await pool.query("SELECT symbol FROM stocks WHERE id = $1", [id]);
        // console.log('res:', result)
        const symbol = result.rows[0].symbol;

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

export default StockService;
