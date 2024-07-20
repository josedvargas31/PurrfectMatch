import express from "express";
import bodyParser from "body-parser";
import usuarioRoutes from "./src/routes/usuarios.routes.js";
import mascotaRoutes from "./src/routes/mascotas.routes.js";
import vacunaRoutes from "./src/routes/vacunas.routes.js";

const servidor = express();
servidor.use(bodyParser.json());
servidor.use(bodyParser.urlencoded({ extended: false }));
servidor.use("/usuario", usuarioRoutes);
servidor.use("/mascota", mascotaRoutes);
servidor.use("/vacuna", vacunaRoutes);

servidor.listen(3000, () => {
	console.log("Funcionando en el puerto 3000");
});
