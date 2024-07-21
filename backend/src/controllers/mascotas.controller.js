import { pool } from "../database/conexion.js";
/* import { validationResult } from "express-validator";
 */
// listar mascotas
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
	
		const { nombre, genero, raza, edad, descripcion, estado, fk_id_usuario } =
			req.body;
		const foto = req.file ? req.file.filename : null;

		console.log(req.body); // Verificar el cuerpo de la solicitud
		const [result] = await pool.query(
			"INSERT INTO Mascotas (nombre, genero, raza, edad, foto, descripcion, estado, fk_id_usuario) VALUES (?,?,?,?,?,?,?,?)",
			[nombre, genero, raza, edad, foto, descripcion, estado, fk_id_usuario]
		);

		if (result.affectedRows > 0) {
			res.status(200).json({
				status: 200,
				message: "Se registró la mascota",
				data: { ...req.body, foto },
			});
		} else {
			res.status(403).json({
				status: 403,
				message: "No se registró la mascota",
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
		const { id } = req.params;
		const { nombre, genero, raza, edad, descripcion, estado, fk_id_usuario } =
			req.body;
		const foto = req.file ? req.file.filename : null;

		// Obtener la mascota actual
		const [currentMascota] = await pool.query(
			"SELECT foto FROM Mascotas WHERE id_mascota=?",
			[id]
		);
		const currentFoto =
			currentMascota.length > 0 ? currentMascota[0].foto : null;

		// Actualizar mascota
		const [result] = await pool.query(
			"UPDATE Mascotas SET nombre=?, genero=?, raza=?, edad=?, foto=?, descripcion=?, estado=?, fk_id_usuario=? WHERE id_mascota=?",
			[
				nombre,
				genero,
				raza,
				edad,
				foto || currentFoto,
				descripcion,
				estado,
				fk_id_usuario,
				id,
			]
		);

		if (result.affectedRows > 0) {
			if (foto && currentFoto) {
				// Eliminar la foto anterior del servidor
				fs.unlink(path.join("public", currentFoto), (err) => {
					if (err) console.error("No se pudo eliminar la foto anterior:", err);
				});
			}

			res.status(200).json({
				status: 200,
				message: "Se actualizó la mascota",
				data: { ...req.body, foto: foto || currentFoto },
			});
		} else {
			res.status(403).json({
				status: 403,
				message: "No se actualizó la mascota",
			});
		}
	} catch (error) {
		res.status(500).json({
			status: 500,
			message: "Error en el servidor " + error.message,
		});
	}
};

// eliminar mascota por ID
export const eliminarMascota = async (req, res) => {
	try {
		const { id_mascota } = req.params;
		const [result] = await pool.query(
			"DELETE FROM Mascotas WHERE id_mascota=?",
			[id_mascota]
		);
		if (result.affectedRows > 0) {
			res.status(200).json({
				status: 200,
				message: "Se eliminó la mascota",
			});
		} else {
			res.status(403).json({
				status: 403,
				message: "No se eliminó la mascota",
			});
		}
	} catch (error) {
		res.status(500).json({
			status: 500,
			message: "Error en el servidor " + error.message,
		});
	}
};

// buscar mascota por ID
export const buscarMascota = async (req, res) => {
	try {
		const { id_mascota } = req.params;
		const [result] = await pool.query(
			"SELECT * FROM Mascotas WHERE id_mascota=?",
			[id_mascota]
		);
		if (result.length > 0) {
			res.status(200).json({
				status: 200,
				message: "Mascota encontrada",
				data: result[0],
			});
		} else {
			res.status(403).json({
				status: 403,
				message: "Mascota no encontrada",
			});
		}
	} catch (error) {
		res.status(500).json({
			status: 500,
			message: "Error en el servidor " + error.message,
		});
	}
};
