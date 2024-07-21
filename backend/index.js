import express from "express";
import bodyParser from "body-parser";
import cors from "cors"

// enpoint 
import usuarioRoutes from "./src/routes/usuarios.routes.js";
import mascotaRoutes from "./src/routes/mascotas.routes.js";
import vacunaRoutes from "./src/routes/vacunas.routes.js";

// validación usuarios
import rutaValidacion from './src/routes/validacion.routes.js'

const servidor = express();

servidor.use(cors());
servidor.use(bodyParser.json());
servidor.use(bodyParser.urlencoded({ extended: false }));

// rutas 
servidor.use(rutaValidacion);

servidor.use("/usuario", usuarioRoutes);
servidor.use("/mascota", mascotaRoutes);
servidor.use("/vacuna", vacunaRoutes);

servidor.listen(3000, () => {
	console.log("Funcionando en el puerto 3000");
});
