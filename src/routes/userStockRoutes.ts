import { authenticateToken } from "../middlewares/authenticateToken";
import UserStockService from "../services/stocks/userStocks";
import { routeInterface } from "../types/routeInterface";

const userStockRoutes: routeInterface[] = [
    {
        path: "/user/stocks/add",
        method: "POST",
        handler: UserStockService.addStock,
        middlewares: [authenticateToken]
    },
    {
        path: "/user/stocks/remove/:id",
        method: "DELETE",
        handler: UserStockService.removeStock,
        middlewares: [authenticateToken]
    },
    {
        path: "/user/stocks",
        method: "GET",
        handler: UserStockService.getStocks,
        middlewares: [authenticateToken]
    },
];

export default userStockRoutes;
