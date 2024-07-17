import { pool } from "../database/conexion.js";
import { validationResult } from "express-validator";

// listar usuarios
export const listarUsuarios = async (req, res) => {
	try {
		const [result] = await pool.query("SELECT * FROM usuarios");
		if (result.length > 0) {
			res.status(200).json({
				status: 200,
				message: "Lsita de los usuarios",
				data: result,
			});
		} else {
			res.status(403).json({
				status: 403,
				message: "No hay usuarios para listar",
			});
		}
	} catch (error) {
		res.status(500).json({
			status: 500,
			message: "Error en el servidor " + error.message,
		});
	}
};

// registrar ususario
export const registrarUsuario = async (req, res) => {
	try {
		const {
			identificacion,
			nombres,
			apellidos,
			correo,
			telefono,
			password,
			rol,
		} = req.body;
		const [result] = await pool.query(
			"INSERT INTO usuarios (identificacion, nombres, apellidos, correo, telefono, password, rol) VALUES (?,?,?,?,?,?,?)",
			[identificacion, nombres, apellidos, correo, telefono, password, rol]
		);
		/* validación de los datos de registrar usuario */
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(404).json({ errors: errors.array() });
		}
		if (result.affectedRows > 0) {
			res.status(200).json({
				status: 200,
				message: "Se regsitro el ususario",
			});
		} else {
			res.status(403).json({
				status: 403,
				message: "No se regsitro el usuario",
			});
		}
	} catch (error) {
		res.status(500).json({
			status: 500,
			message: "Error en el servidor " + error.message,
		});
	}
};

// actualizar ususario
export const actualizarUsuario = async (req, res) => {
	try {
		const { identificacion } = req.params;
		const { nombres, apellidos, correo, telefono, password, rol } = req.body;
		const [result] = await pool.query(
			"UPDATE usuarios SET nombres=?, apellidos=?, correo=?, telefono=?, password=?, rol=? WHERE identificacion=?",
			[identificacion, nombres, apellidos, correo, telefono, password, rol]
		);
        /* validación de los datos de actualizar usuario */
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(404).json({ errors: errors.array() });
		}
		if (result.affectedRows > 0) {
			res.status(200).json({
				status: 200,
				message: "Se actualizo el usuario",
			});
		} else {
			res.status(403).json({
				status: 403,
				message: "No se actualizo el usuario",
			});
		}
	} catch (error) {
		res.status(500).json({
			status: 500,
			message: "Error en el servidor " + error.message,
		});
	}
};

// Eliminar ususario
export const eliminarUsuario = async (req, res) => {
	try {
		const { identificacion } = req.params;
		const [result] = await pool.query(
			"DELETE FROM usuarios WHERE identificacion=?"
		);
		if (result.affectedRows > 0) {
			res.status(200).json({
				status: 200,
				message: "Se elimino el usuario",
			});
		} else {
			res.status(403).json({
				status: 403,
				message: "No se elimino el ususario",
			});
		}
	} catch (error) {
		res.status(500).json({
			status: 500,
			message: "Error en el servidor " + error.message,
		});
	}
};
