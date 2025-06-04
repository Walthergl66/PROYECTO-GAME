// import "reflect-metadata";
// import { DataSource } from "typeorm";
// import { Preguntas } from "./models/Preguntas";
// import dotenv from "dotenv";

// dotenv.config();

// export const AppDataSource = new DataSource({
//     type: "postgres",
//     host: process.env.DB_HOST || "localhost",
//     port: Number(process.env.DB_PORT) || 5432,
//     username: process.env.DB_USER || "postgres",
//     password: process.env.DB_PASSWORD || "Hola",
//     database: process.env.DB_NAME || "Game",
//     synchronize: true,
//     logging: false,
//     ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
//     entities: [Preguntas],
// });
import { DataSource } from 'typeorm'
import * as dotenv from 'dotenv'
import { Preguntas } from './models/Preguntas'
dotenv.config()

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true, 
  ssl: {
    rejectUnauthorized: false, 
  },
  entities: [Preguntas],
})
