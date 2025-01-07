import { Router } from "express";
import { validar } from "../controllers/validacion.controller.js";

const rutaValidacion = Router()

rutaValidacion.post('/validacion', validar)

export default rutaValidacion