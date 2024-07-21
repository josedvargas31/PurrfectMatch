import { Router } from "express";
// controllers
import { listarUsuarios, registrarUsuario, actualizarUsuario, eliminarUsuario, buscarUsuario } from "../controllers/usuarios.controller.js";
// validacion de datos
import { validateRegistroUsuario, validateActualizarUsuario } from "../validation/usuarios.validation.js";
// valida por token
import { validarToken } from "../controllers/validacion.controller.js";

const usuarioRoutes = Router();

usuarioRoutes.get("/listar", validarToken, listarUsuarios);
usuarioRoutes.get("/buscar/:id_usuario", validarToken, buscarUsuario);
usuarioRoutes.post("/registrar", validarToken, validateRegistroUsuario, registrarUsuario);
usuarioRoutes.put("/actualizar/:id_usuario", validarToken, validateActualizarUsuario, actualizarUsuario);
usuarioRoutes.delete("/eliminar/:id_usuario", validarToken, eliminarUsuario);


export default usuarioRoutes;
