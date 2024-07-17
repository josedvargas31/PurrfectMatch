import {Router} from "express";
import { actualizarUsuario, eliminarUsuario, listarUsuarios, registrarUsuario } from "../controllers/usuarios.controller";
import { validateActualizarUsuario, validateRegistroUsuario } from "../validation/usuario.validation.js";

const rutaUsuario = Router()

rutaUsuario.get("/listarusuarios", listarUsuarios)
rutaUsuario.get("/registrarusuario", validateRegistroUsuario, registrarUsuario)
rutaUsuario.get("/actualizarusuario", validateActualizarUsuario, actualizarUsuario)
rutaUsuario.get("/eliminarusuario", eliminarUsuario)