import express from "express";
import { routeInterface } from "../types/routeInterface";
import upstoxLoginRoutes from "../routes/upstox/loginRoutes";
import upstoxServiceRoutes from "../routes/upstox/serviceRoutes";
import stockRoutes from "../routes/stockRoutes";
import authRoutes from "../routes/auth/authRoutes";
import userStockRoutes from "../routes/userStockRoutes";

const router = express.Router();
const routes: routeInterface[] = [];

routes.push(...authRoutes);
routes.push(...upstoxLoginRoutes);
routes.push(...upstoxServiceRoutes);
routes.push(...stockRoutes);
routes.push(...userStockRoutes);

routes.forEach(route => {
    const {method, path, handler, middlewares = []} = route;

    // console.log(route);
    if(method === "GET") {
        router.get(path, ...middlewares, handler);
    } else if(route.method === "POST") {
        router.post(path, ...middlewares, handler);
    } else if(route.method === "PUT") {
        router.put(path, ...middlewares, handler);
    } else if(route.method === "DELETE") {
        router.delete(path, ...middlewares, handler);
    }
});

export default router;