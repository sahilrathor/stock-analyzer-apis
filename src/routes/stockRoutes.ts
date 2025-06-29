import { authenticateToken } from "../middlewares/authenticateToken";
import StockService from "../services/stocks/stocks";
import { routeInterface, RoutesInfoInterface } from "../types/routeInterface";

/**
 * stockRoutes contains routes for stock-related operations. These routes
 * are to be used for adding, removing, searching and retrieving stock
 * information. The routes are:
 * - /stocks: GET - Retrieves all stocks
 * - /stocks/search: GET - Searches for a stock by name or symbol
 * - /stocks/add: POST - Adds a new stock
 * - /stocks/remove/:id: DELETE - Removes a stock
 * - /stocks/:id: GET - Retrieves a stock's quote information
 */
const stockRoutes: RoutesInfoInterface = {
    name: "stock routes",
    routes: [
        {
            path: "/stocks",
            method: "GET",
            handler: StockService.getStocks,
        },
        {
            path: "/stocks/search",
            method: "GET",
            handler: StockService.searchStock,
        },
        {
            path: "/stocks/add",
            method: "POST",
            handler: StockService.addStock,
            middlewares: [authenticateToken],
        },
        {
            path: "/stocks/remove/:id",
            method: "DELETE",
            handler: StockService.removeStock,
            middlewares: [authenticateToken],
        },
        {
            path: "/stocks/:id",
            method: "GET",
            handler: StockService.getQuoteinfo,
        },
    ],
};

export default stockRoutes;
