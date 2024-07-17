import { Router } from "express";
import {
	actualizarMascota,
	eliminarMascota,
	listarMascotas,
	registrarMascota,
} from "../controllers/mascotas.controller.js";
import { validateActualizarMascota, validateRegistroMascota } from "../validation/mascota.validation.js";

const rutaMascota = Router();

rutaMascota.get("/listarmascotas", listarMascotas);
rutaMascota.post("/registrarmascota", validateRegistroMascota, registrarMascota);
rutaMascota.put("/actualizarmascota", validateActualizarMascota, actualizarMascota); 
rutaMascota.delete("/eliminarmascota", eliminarMascota); 

export default rutaMascota;
