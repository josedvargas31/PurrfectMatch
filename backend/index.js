import express from "express";
import bodyParser from "body-parser";
import rutaMascota from "./src/routes/mascotas.routes.js";

const servidor = express();

servidor.use(bodyParser.json());
servidor.use(bodyParser.urlencoded({ extended: false }));
servidor.use(rutaMascota)

servidor.listen(3000, () => {
	console.log("Funcionando en el puerto 3000");
});
