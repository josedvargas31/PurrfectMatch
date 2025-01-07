import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener el directorio del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


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

// / Middleware para servir archivos estáticos desde la carpeta 'uploads'
servidor.use('/uploads', express.static(path.join(__dirname, 'uploads')));

servidor.listen(3000, () => {
	console.log("Funcionando en el puerto 3000");
});
