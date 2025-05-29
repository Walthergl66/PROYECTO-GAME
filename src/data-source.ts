import "reflect-metadata";
import { DataSource } from "typeorm";
import { Preguntas } from "./models/Preguntas";
import { parse } from "path/posix";
require('dotenv').config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 6543,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Preguntas],
  synchronize: false, // o true solo en desarrollo
  logging: false,
});
