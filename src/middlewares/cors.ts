import cors from "cors";

export const corsMiddleware = cors({
    origin: "*",
    credentials: true,
    exposedHeaders: ["set-cookie"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
});
