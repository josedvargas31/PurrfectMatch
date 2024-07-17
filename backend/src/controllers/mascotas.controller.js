import { pool } from "../database/conexion.js";
import { validationResult } from "express-validator";

// Listar mascotas
export const listarMascotas = async (req, res) => {
	try {
		const [result] = await pool.query("SELECT * FROM mascotas");
		if (result.length > 0) {
			res.status(200).json({
				status: 200,
				message: "Lista de las mascotas",
				data: result,
			});
		} else {
			res.status(403).json({
				status: 403,
				message: "No hay mascotas para listar",
			});
		}
	} catch (error) {
		res.status(500).json({
			status: 500,
			message: "Error en el servidor " + error.message,
		});
	}
};

// Registrar mascota
export const registrarMascota = async (req, res) => {
	try {
		const { nombre, genero, raza, edad, ubicacion, descripcion } = req.body;
		const [result] = await pool.query(
			"INSERT INTO mascotas (nombre, genero, raza, edad, ubicacion, descripcion) VALUES (?,?,?,?,?,?)",
			[nombre, genero, raza, edad, ubicacion, descripcion]
		);
		/* validación de datos del registro de la mascota */
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(404).json({ errors: errors.array() });
		}
		if (result.affectedRows > 0) {
			res.status(200).json({
				status: 200,
				message: "Se registro con exito la mascota",
				data: result,
			});
		} else {
			res.status(403).json({
				status: 200,
				message: "No se registro la mascota",
			});
		}
	} catch (error) {
		res.status(500).json({
			status: 500,
			message: "Error en el servidor " + error.message,
		});
	}
};

// Actualizar mascota
export const actualizarMascota = async (req, res) => {
	try {
		const { id_mascota } = req.params;
		const { nombre, genero, raza, edad, ubicacion, descripcion } = req.body;
		const [result] = await pool.query(
			"UPDATE mascotas SET nombre=?, genero=?, raza=?, edad=?, ubicacion=?, descripcion=? WHERE id_mascota",
			[id_mascota, nombre, genero, raza, edad, ubicacion, descripcion]
		);
		/* validación de datos de actualizar de la mascota */
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(404).json({ errors: errors.array() });
		}
		if (result.affectedRows > 0) {
			res.status(200).json({
				status: 200,
				message: "Se actualizo con exito la mascota",
			});
		} else {
			res.status(403).json({
				status: 403,
				message: "No se actualizo la mascota",
			});
		}
	} catch (error) {
		res.status(500).json({
			status: 500,
			message: "Error en el servidor " + error.message,
		});
	}
};

// Eliminar mascota
export const eliminarMascota = async (req, res) => {
	try {
		const { id_mascota } = req.params;
		const { nombre, genero, raza, edad, ubicacion, descripcion } = req.body;
		const [result] = await pool.query(
			"DELETE FROM mascotas WHERE id_mascota=?"
		);
		if (result.affectedRows > 0) {
			res.status(200).json({
				status: 200,
				message: "Se elimino la mascota",
				data: result,
			});
		} else {
			res.status(403).json({
				status: 403,
				message: "No se elimino la mascota",
			});
		}
	} catch (error) {
		res.status(500).json({
			status: 500,
			message: "Error en el servidor " + error.message,
		});
	}
};
