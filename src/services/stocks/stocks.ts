import { Request, Response } from "express";
import pool from "../../db/dbConnect";
import yFinance from "../../external-services/yahoo-finance/yahooFinance";

class StockService {
    static async getStocks(req: Request, res: Response) {
        try {
            const result = await pool.query("SELECT id, name, symbol, exchange, sector, industry FROM stocks");
            return res.status(200).json({
                meta: {
                    message: "Stocks fetched successfully",
                    error: false,
                },
                data: {
                    stocksCount: result.rowCount,
                    stocks: result.rows,
                },
            });
        } catch (error: any) {
            console.log("searchStock error:", error);
            return res.status(500).json({
                meta: {
                    message: "Internal Server Error",
                    error: true,
                },
            });
        }
    }

    static async searchStock(req: Request, res: Response) {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({
                meta: {
                    message: "Missing query",
                    error: true,
                },
            });
        }
        try {
            const result = await yFinance.searchSymbol(query as string);

            const stocks = result.quotes;
            const news = result.news;
            return res.status(200).json({
                meta: {
                    message: "Symbol searched successfully",
                    error: false,
                },
                data: {
                    stocks: {
                        count: stocks.length,
                        stocks: stocks,
                    },
                    news: {
                        count: news.length,
                        news: news,
                    },
                },
            });
        } catch (error: any) {
            console.log("searchStock error:", error);
            return res.status(500).json({
                meta: {
                    message: "Internal Server Error",
                    error: true,
                },
            });
        }
    }

    static async addStock(req: Request, res: Response) {
        const { name, symbol, exchange, sector, industry } = req.body;

        if (!name || !symbol) {
            return res.status(400).json({
                meta: {
                    message: "Missing field",
                    error: true,
                },
            });
        }

        const isExists = await pool.query("SELECT id FROM stocks WHERE symbol = $1", [symbol]);
        if (isExists.rowCount !== 0) {
            return res.status(409).json({
                meta: {
                    message: "Stock already exists with this symbol",
                    error: true,
                },
            });
        }

        try {
            await pool.query(
                "INSERT INTO stocks (name, symbol, exchange, sector, industry) VALUES ($1, $2, $3, $4, $5)",
                [name, symbol, exchange || "", sector || "", industry || ""]
            );

            return res.status(201).json({
                meta: {
                    message: "Stock added successfully",
                    error: false,
                },
            });
        } catch (error: any) {
            console.log("addStock error:", error);
            return res.status(500).json({
                meta: {
                    message: "Internal Server Error",
                    error: true,
                },
            });
        }
    }

    static async removeStock(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                meta: {
                    message: "missing field: id",
                    error: true,
                },
            });
        }

        const isExists = await pool.query("SELECT id FROM stocks WHERE id = $1", [id]);

        if (isExists.rowCount === 0) {
            return res.status(400).json({
                meta: {
                    message: "Stock not found",
                    error: true,
                },
            });
        }

        try {
            await pool.query("DELETE FROM stocks WHERE id = $1", [id]);

            return res.status(200).json({
                meta: {
                    message: "Stock deletd successhully",
                    error: false,
                },
            });
        } catch (error) {
            console.log("removeStock error:", error);
            return res.status(200).json({
                meta: {
                    message: "Internal Server Error",
                    error: true,
                },
            });
        }
    }

    static async getQuoteinfo(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({   
                meta: {
                    message: "missing field: id",
                    error: true,
                },
            });
        }

        const result = await pool.query("SELECT symbol FROM stocks WHERE id = $1", [id]);
        // console.log('res:', result)
        const symbol = result.rows[0].symbol;

        try {
            const result = await yFinance.quoteSymbol(symbol as string);
            // console.log('yfin:', result)
            return res.status(200).json({
                meta: {
                    message: "Quote info fetched successfully",
                    error: false,
                },
                data: {
                    result: result,
                },
            });
        } catch (error) {
            console.log("getQuoteInfo error:", error);
            return res.status(200).json({
                meta: {
                    message: "Internal Server Error",
                    error: true,
                },
            });
        }
    }
}

export default StockService;
