// middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { tokenPayloadInterface } from "../types/userInterface";
import { verifyToken } from "../utils/jwtToken";

// export interface AuthenticatedRequest extends Request {
//     user?: tokenPayloadInterface;
// }

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    // console.log("authHeader", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Missing or invalid Authorization header" });
    }

    const token = authHeader.split(" ")[1];
    // console.log("token", token);

    try {
        const decoded = verifyToken(token);
        // console.log("decoded", decoded);
        req.user = decoded || {};
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
