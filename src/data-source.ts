import "reflect-metadata";
import { DataSource } from "typeorm";
import {Preguntas} from "./models/Preguntas";
//import {Respuestas} from "./entities/Respuestas";
//import {Usuarios} from "./entities/Usuarios";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost", 
    port: 5432,
    username: "postgres",
    password: "Hola",
    database: "Game",
    synchronize: true,
    logging: false,
    entities: [Preguntas],
});
