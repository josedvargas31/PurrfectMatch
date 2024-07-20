import { Router } from "express";
import {
	listarMascotas,
	registrarMascota,
	actualizarMascota,
	eliminarMascota,
	buscarMascota,
} from "../controllers/mascotas.controller.js";
import {
	validateRegistroMascota,
	validateActualizarMascota,
} from "../validation/mascota.validation.js";

const mascotaRoutes = Router();

mascotaRoutes.get("/listar", listarMascotas);
mascotaRoutes.post("/registrar", validateRegistroMascota, registrarMascota);
mascotaRoutes.put("/actualizar/:id_mascota", validateActualizarMascota, actualizarMascota);
mascotaRoutes.delete("/eliminar/:id_mascota", eliminarMascota);
mascotaRoutes.get("/buscar/:id_mascota", buscarMascota);

export default mascotaRoutes;
