import express from "express";
import authRoutes from "../routes/authRoutes";
import { routeInterface } from "../types/routeInterface";

const router = express.Router();
const routes: routeInterface[] = [];

routes.push(...authRoutes);

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