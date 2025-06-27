import { authenticateToken } from "../middlewares/authenticateToken";
import UserStockService from "../services/stocks/userStocks";
import { routeInterface } from "../types/routeInterface";

const userStockRoutes: routeInterface[] = [
    {
        path: "/user/stock/add",
        method: "POST",
        handler: UserStockService.addStock,
        middlewares: [authenticateToken]
    },
];

export default userStockRoutes;
