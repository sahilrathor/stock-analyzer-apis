// import express from "express";
// import { routeInterface } from "../types/routeInterface";
// import upstoxLoginRoutes from "../routes/upstox/loginRoutes";
// import upstoxServiceRoutes from "../routes/upstox/serviceRoutes";
// import stockRoutes from "../routes/stockRoutes";
// import authRoutes from "../routes/auth/authRoutes";
// import userStockRoutes from "../routes/userStockRoutes";

// const router = express.Router();
// const routes: routeInterface[] = [];

// routes.push(...authRoutes);
// routes.push(...upstoxLoginRoutes);
// routes.push(...upstoxServiceRoutes);
// routes.push(...stockRoutes);
// routes.push(...userStockRoutes);

// routes.forEach(route => {
//     const {method, path, handler, middlewares = []} = route;

//     // console.log(route);
//     if(method === "GET") {
//         router.get(path, ...middlewares, handler);
//     } else if(route.method === "POST") {
//         router.post(path, ...middlewares, handler);
//     } else if(route.method === "PUT") {
//         router.put(path, ...middlewares, handler);
//     } else if(route.method === "DELETE") {
//         router.delete(path, ...middlewares, handler);
//     }
// });

// export default router;


import express from "express";
import path from "path";
import fs from "fs-extra";
import { routeInterface, RoutesInfoInterface } from "../types/routeInterface";

import upstoxLoginRoutes from "../routes/upstox/loginRoutes";
import upstoxServiceRoutes from "../routes/upstox/serviceRoutes";
import stockRoutes from "../routes/stockRoutes";
import authRoutes from "../routes/auth/authRoutes";
import userStockRoutes from "../routes/userStockRoutes";

const router = express.Router();
const routes: routeInterface[] = [];
const registeredRoutes: any = [];

const serializeRoutes = (route: routeInterface) => ({
    path: route.path,
    method: route.method,
    handler: route.handler.name || "anonymous",
    middlewares: route.middlewares?.map((m) => m.name || "anonymous") || [],
});

const registerRoute = (routesList: RoutesInfoInterface[]) => {
    routesList.forEach((data) => {
        const serializedRoutes = data.routes.map(serializeRoutes);
        registeredRoutes.push({
            name: data.name,
            routes: serializedRoutes,
        });

        data.routes.forEach((d) => {
            routes.push(d);
        });
    });
};

registerRoute([authRoutes, stockRoutes, userStockRoutes, upstoxLoginRoutes, upstoxServiceRoutes]);

routes.forEach((route) => {
    const { method, path, handler, middlewares = [] } = route;

    switch (method) {
        case "GET":
            router.get(path, ...middlewares, handler);
            break;
        case "POST":
            router.post(path, ...middlewares, handler);
            break;
        case "PUT":
            router.put(path, ...middlewares, handler);
            break;
        case "DELETE":
            router.delete(path, ...middlewares, handler);
            break;
    }
});

// Write to a JSON file using fs-extra
const outputDir = path.join(__dirname, "./generated");
const outputFile = path.join(outputDir, "routes.json");

fs.ensureDirSync(outputDir);

fs.writeJsonSync(outputFile, registeredRoutes, { spaces: 2 });

// const textOutput = registeredRoutes
//     .map((r) => `[${r.method}] ${r.path} → Handler: ${r.handler} | Middlewares: ${r.middlewares.join(", ")}`)
//     .join("\n");

// fs.writeFileSync(path.join(outputDir, "routes.txt"), textOutput, "utf-8");

// const csvHeader = "method,path,handler,middlewares\n";
// const csvRows = registeredRoutes
//     .map((r) => `${r.method},${r.path},${r.handler},"${r.middlewares.join(", ")}"`)
//     .join("\n");

// const csvOutput = csvHeader + csvRows;

// fs.writeFileSync(path.join(outputDir, "routes.csv"), csvOutput, "utf-8");

export default router;
