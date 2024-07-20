import { Router } from "express";
import {
	listarVacunas,
	registrarVacuna,
	actualizarVacuna,
	eliminarVacuna,
	buscarVacuna,
} from "../controllers/vacunas.controller.js";
import {
	validateRegistroVacuna,
	validateActualizarVacuna,
} from "../validation/vacuna.validation.js";

const vacunaRoutes = Router();

vacunaRoutes.get("/listar", listarVacunas);
vacunaRoutes.post("/registrar", validateRegistroVacuna, registrarVacuna);
vacunaRoutes.put(
	"/actualizar/:id_vacuna",
	validateActualizarVacuna,
	actualizarVacuna
);
vacunaRoutes.delete("/eliminar/:id_vacuna", eliminarVacuna);
vacunaRoutes.get("/buscar/:id_vacuna", buscarVacuna);

export default vacunaRoutes;
