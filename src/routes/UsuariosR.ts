import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Usuario } from "../models/Usuarios";

const route = Router();

route.get("/", async ( req, res ) => {
    try {
        const usuario = await AppDataSource.getRepository(Usuario).find()
        res.json(usuario)
    } catch (error){
        res.status
    }
});