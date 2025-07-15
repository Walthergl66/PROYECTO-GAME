
// import { DataSource } from 'typeorm'
// import * as dotenv from 'dotenv'
// import { Preguntas } from './models/Preguntas'
// dotenv.config()

// export const AppDataSource = new DataSource({
//   type: 'postgres',
//   host: process.env.DB_HOST,
//   port: Number(process.env.DB_PORT),
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   synchronize: true, 
//   ssl: {
//     rejectUnauthorized: false, 
//   },
//   entities: [Preguntas],
// })
import { DataSource } from 'typeorm'
import * as dotenv from 'dotenv'
import { Preguntas } from './models/Preguntas'
dotenv.config()

export const AppDataSource = new DataSource({
  type: 'mysql', // <- CAMBIADO de 'postgres' a 'mysql'
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT), // normalmente 3306 para MySQL
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true, 
  ssl: false, // <- puedes usar false o configurar correctamente si tu hosting requiere SSL
  entities: [Preguntas],
})
