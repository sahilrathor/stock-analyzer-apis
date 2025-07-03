import jwt from "jsonwebtoken";
import envConfig from "../config/envConfig";
import { tokenPayloadInterface } from "../types/userInterface";

/**
 * 
 * @param payload (id, name, email)
 * @returns 
 */
export const generateToken = (payload: tokenPayloadInterface) => {
    return jwt.sign(payload, envConfig.JWT_SECRET, {
        expiresIn: "7d"
    });
}

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, envConfig.JWT_SECRET) as tokenPayloadInterface;
    } catch (error) {
        console.log("error", error);
        return null;
    }
}
