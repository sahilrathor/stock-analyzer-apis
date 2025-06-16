import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwtToken";

export const protectedRoute = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token not found" });
    }

    try {
        const decodedToken = verifyToken(token);
        req = decodedToken; // fix it later
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    next();
};
