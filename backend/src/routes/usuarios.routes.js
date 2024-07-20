import { Router } from "express";
import {
	listarUsuarios,
	registrarUsuario,
	actualizarUsuario,
	eliminarUsuario,
	buscarUsuario,
} from "../controllers/usuarios.controller.js";
import {
	validateRegistroUsuario,
	validateActualizarUsuario,
} from "../validation/usuario.validation.js";

const usuarioRoutes = Router();

usuarioRoutes.get("/listar", listarUsuarios);
usuarioRoutes.post("/registrar", validateRegistroUsuario, registrarUsuario);
usuarioRoutes.put("/actualizar/:id_usuario", validateActualizarUsuario, actualizarUsuario);
usuarioRoutes.delete("/eliminar/:id_usuario", eliminarUsuario);
usuarioRoutes.get("/buscar/:id_usuario", buscarUsuario);

export default usuarioRoutes;
