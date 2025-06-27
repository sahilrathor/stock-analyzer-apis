import { JwtPayload } from "jsonwebtoken";
import { tokenPayloadInterface } from "../../types/userInterface";

declare global {
    namespace Express {
        interface Request {
            user?: tokenPayloadInterface | JwtPayload;
        }
    }
}
