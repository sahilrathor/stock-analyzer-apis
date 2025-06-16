import jwt from "jsonwebtoken";
import envConfig from "../config/envConfig";

export const generateToken = (payload: any) => {
    return jwt.sign(payload, envConfig.JWT_SECRET, {
        expiresIn: "1d"
    });
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, envConfig.JWT_SECRET) as any;
}
