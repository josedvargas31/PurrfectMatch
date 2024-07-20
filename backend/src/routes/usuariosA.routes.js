import { Router } from "express";
// controllers
import { listarUsuariosA, registrarUsuarioA, actualizarUsuarioA, eliminarUsuarioA, buscarUsuarioA } from "../controllers/usuariosA.controller.js";
// validacion de datos
import { validateRegistroUsuario, validateActualizarUsuario } from "../validation/usuarios.validation.js";
// valida por token
import { validarToken } from "../controllers/validacion.controller.js";

const usuarioAdmiRoutes = Router();

usuarioAdmiRoutes.get("/listara", validarToken, listarUsuariosA);
usuarioAdmiRoutes.get("/buscara/:id_usuario", validarToken, buscarUsuarioA);
usuarioAdmiRoutes.post("/registrara", validarToken, validateRegistroUsuario, registrarUsuarioA);
usuarioAdmiRoutes.put("/actualizara/:id_usuario", validarToken, validateActualizarUsuario, actualizarUsuarioA);
usuarioAdmiRoutes.delete("/eliminara/:id_usuario", validarToken, eliminarUsuarioA);


export default usuarioAdmiRoutes;
