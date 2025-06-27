import { JwtPayload } from "jsonwebtoken";
import { tokenPayloadInterface } from "../userInterface";

declare global {
    namespace Express {
        interface Request {
            user?: tokenPayloadInterface | JwtPayload;
        }
    }
}

export {};