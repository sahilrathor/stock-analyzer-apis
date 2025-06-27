import { NextFunction, Request, Response } from "express";

export interface routeInterface {
    path: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
    handler: (req: Request, res: Response) => void;
    middlewares?: Array<(req: Request, res: Response, next: NextFunction) => any>;
}
