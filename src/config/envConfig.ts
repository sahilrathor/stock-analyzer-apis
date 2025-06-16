import { EnvInterface } from "../types/envInterface";

const envConfig: EnvInterface = {
    PORT: Number(process.env.PORT) || 5000,
    JWT_SECRET: process.env.JWT_SECRET || "secret",
};

export default envConfig;
