import "reflect-metadata";
import { DataSource } from "typeorm";
import { Preguntas } from "./models/Preguntas";
require('dotenv').config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "aws-0-us-east-2.pooler.supabase.com",
  port: 6543,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Preguntas],
  synchronize: false, // o true solo en desarrollo
  logging: false,
});
