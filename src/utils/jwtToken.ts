import jwt from "jsonwebtoken";
import envConfig from "../config/envConfig";
import { tokenPayloadInterface } from "../types/userInterface";

export const generateToken = (payload: tokenPayloadInterface) => {
    return jwt.sign(payload, envConfig.JWT_SECRET, {
        expiresIn: "1d"
    });
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, envConfig.JWT_SECRET) as tokenPayloadInterface;
}
