import { authenticateToken } from "../middlewares/authenticateToken";
import UserStockService from "../services/stocks/userStocks";
import { routeInterface, RoutesInfoInterface } from "../types/routeInterface";

const userStockRoutes: RoutesInfoInterface = {
    name: "user stock",
    routes: [
        {
            path: "/user/stocks/add",
            method: "POST",
            handler: UserStockService.addStock,
            middlewares: [authenticateToken],
        },
        {
            path: "/user/stocks/remove/:stockId",
            method: "DELETE",
            handler: UserStockService.removeStock,
            middlewares: [authenticateToken],
        },
        {
            path: "/user/stocks",
            method: "GET",
            handler: UserStockService.getStocks,
            middlewares: [authenticateToken],
        },
    ],
};

export default userStockRoutes;
