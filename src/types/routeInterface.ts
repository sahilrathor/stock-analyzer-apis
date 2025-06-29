import { NextFunction, Request, Response } from "express";

export interface routeInterface {
    path: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
    handler: (req: Request, res: Response) => any;
    middlewares?: Array<(req: Request, res: Response, next: NextFunction) => any>;
}

export interface RoutesInfoInterface {
    name: string;
    routes: routeInterface[];
}