import { Request, Response } from "express";

class AuthService {
    static async register(req: Request, res: Response) {
        try {
            res.send("Register");
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    }    
}

export default AuthService;