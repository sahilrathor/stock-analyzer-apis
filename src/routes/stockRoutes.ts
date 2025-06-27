import { authenticateToken } from "../middlewares/authenticateToken";
import StockService from "../services/stocks/stocks";
import { routeInterface } from "../types/routeInterface";

const stockRoutes: routeInterface[] = [
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
        middlewares: [authenticateToken]
    },
    {
        path: "/stocks/remove/:id",
        method: "DELETE",
        handler: StockService.removeStock,
        middlewares: [authenticateToken]
    },
    {
        path: "/stocks/:id",
        method: "GET",
        handler: StockService.getQuoteinfo,
    },
];

export default stockRoutes;
