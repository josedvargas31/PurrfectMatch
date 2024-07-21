import { Router } from "express";
// controllers
import { listarUsuariosU, registrarUsuarioU, actualizarUsuarioU, eliminarUsuarioU, buscarUsuarioU } from "../controllers/usuariosU.controller.js";
// validacion de datos

// valida por token
import { validarToken } from "../controllers/validacion.controller.js";
import { validateActualizarUsuario, validateRegistroUsuario } from "../validation/usuarios.validation.js";

const usuarioAdmiRoutes = Router();

usuarioAdmiRoutes.get("/listara", validarToken, listarUsuariosU);
usuarioAdmiRoutes.get("/buscara/:id_usuario", validarToken, buscarUsuarioU);
usuarioAdmiRoutes.post("/registrara", validarToken, validateRegistroUsuario, registrarUsuarioU);
usuarioAdmiRoutes.put("/actualizara/:id_usuario", validarToken, validateActualizarUsuario, actualizarUsuarioU);
usuarioAdmiRoutes.delete("/eliminara/:id_usuario", validarToken, eliminarUsuarioU);


export default usuarioAdmiRoutes;
