import StockService from "../services/stocks/stocks";
import { routeInterface } from "../types/routeInterface";

const stockRoutes: routeInterface[] = [
    {
        path: "/stock/search",
        method: "GET",
        handler: StockService.searchStock,
    },
    {
        path: "/stock/add",
        method: "POST",
        handler: StockService.addStock,
    },
    {
        path: "/stock/remove/:id",
        method: "GET",
        handler: StockService.removeStock,
    },
    {
        path: "/stock/:id",
        method: "GET",
        handler: StockService.getQuoteinfo,
    },
];

export default stockRoutes;
