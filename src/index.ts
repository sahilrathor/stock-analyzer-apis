import express, { Request, Response } from "express";
import dotenv from "dotenv";
import envConfig from "./config/envConfig";
import figletText from "./utils/figlet";
import routerConfig from "./config/routerConfig";
import { corsMiddleware } from "./middlewares/cors";

dotenv.config();
const app = express();
const PORT = envConfig.PORT;

app.use(express.json());
app.use(corsMiddleware);

app.use("/api", routerConfig);

app.get("/", (req: Request, res: Response) => {
    res.send("Stock Analyzer - APIs");
});

app.listen(PORT, () => {
    console.log(figletText);
    console.log(`Server is running on http://localhost:${PORT}`);
});
