import yahooFinance from "yahoo-finance2";

class yFinance {
    static async searchSymbol(query: string) {
        if (!query) {
            throw new Error("Query is required");
        }
        try {
            const result = await yahooFinance.search(query /* queryOptions */);
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    static async quoteSymbol(query: string) {
        if (!query) {
            throw new Error("Query is required");
        }
        try {
            const result = await yahooFinance.quote(query /* queryOptions */);
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}


export default yFinance;