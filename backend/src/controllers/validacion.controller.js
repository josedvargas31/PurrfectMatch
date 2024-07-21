import { pool } from "../database/conexion.js";
import Jwt from "jsonwebtoken";


// validacion 
export const validar = async (req, res) => {
	try {
		let { correo, password } = req.body;
		let sql = `SELECT * from usuarios where correo='${correo}' and password='${password}'`;

		const [rows] = await pool.query(sql);
		if (rows.length > 0) {
			// Incluir la identificación del usuario en el token JWT
			let token = Jwt.sign(
				{ user: rows[0].identificacion },
				process.env.AUT_SECRET,
				{ expiresIn: process.env.AUT_EXPIRE }
			);
			return res.status(200).json({
				user: rows,
				token: token,
				message: "token generado con éxito",
			});
		} else {
			return res.status(404).json({
				status: 404,
				message: "Usuario no autorizado",
			});
		}
	} catch (error) {
		res.status(500).json({
			status: 500,
			message: "Error del servidor" + error,
		});
	}
};

// verificar
export const validarToken = async (req, res, next) => {
	try {
		let tokenClient = req.headers["token"];

		if (!tokenClient) {
			res.status(403).json({
				status: 403,
				message: "Token es requerido",
			});
		} else {
			Jwt.verify(tokenClient, process.env.AUT_SECRET, (error, decoded) => {
				if (error) {
					res.status(403).json({
						status: 403,
						message: "Token es inválido o ha expirado",
					});
				} else {
					// Decodificar el token y establecer req.usuario
					req.usuario = decoded.user;
					next();
				}
			});
		}
	} catch (error) {
		res.status(500).json({
			status: 500,
			message: "Error del servidor: " + error.message,
		});
	}
};
