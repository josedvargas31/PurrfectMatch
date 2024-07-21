import { Router } from "express";
// controllers
import { actualizarAdopcion, buscarAdopcion, eliminarAdopcion, listarAdopciones, registrarAdopcion } from "../controllers/adopciones.controller.js";
// validacion de datos
import { validateActualizarAdoptar, validateRegistroAdoptar } from "../validation/adopciones.validation.js";
// valida por token
import { validarToken } from "../controllers/validacion.controller.js";



const usuarioAdmiRoutes = Router();

usuarioAdmiRoutes.get("/listara", validarToken, listarAdopciones);
usuarioAdmiRoutes.get("/buscara/:id_adopcion", validarToken, buscarAdopcion);
usuarioAdmiRoutes.post("/registrara", validarToken, validateRegistroAdoptar, registrarAdopcion);
usuarioAdmiRoutes.put("/actualizara/:id_adopcion", validarToken, validateActualizarAdoptar, actualizarAdopcion);
usuarioAdmiRoutes.delete("/eliminara/:id_adopcion", validarToken, eliminarAdopcion);


export default usuarioAdmiRoutes;
