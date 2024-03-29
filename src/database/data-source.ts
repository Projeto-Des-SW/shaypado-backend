import "reflect-metadata"
import { DataSource } from "typeorm"
import "dotenv/config";


const port: string | undefined = process.env.DB_PORT;

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(port || "5432"),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: ["src/database/entities/*.ts"],
    migrations: ["src/database/migrations/*.ts"],
    subscribers: [],
})
