import express from "express";
import { routeInterface } from "../types/routeInterface";
import authRoutes from "../routes/authRoutes";
import upstoxLoginRoutes from "../routes/upstox/loginRoutes";
import upstoxServiceRoutes from "../routes/upstox/serviceRoutes";

const router = express.Router();
const routes: routeInterface[] = [];

routes.push(...authRoutes);
routes.push(...upstoxLoginRoutes);
routes.push(...upstoxServiceRoutes);

routes.forEach(route => {
    if(route.method === "GET") {
        router.get(route.path, route.handler);
    } else if(route.method === "POST") {
        router.post(route.path, route.handler);
    } else if(route.method === "PUT") {
        router.put(route.path, route.handler);
    } else if(route.method === "DELETE") {
        router.delete(route.path, route.handler);
    }
});

export default router;