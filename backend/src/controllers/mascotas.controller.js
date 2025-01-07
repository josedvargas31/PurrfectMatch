import { pool } from "../database/conexion.js";
import fs from "fs";
import path from "path";
import { validationResult } from "express-validator";

// listar mascotas
export const listarMascotas = async (req, res) => {
	try {
		const [result] = await pool.query("SELECT * FROM mascotas");
		if (result.length > 0) {
			res.status(200).json(result);
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
// cambio de estado de la mascota a en proceso
export const iniciarAdopcion = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { id_mascota } = req.params;
		const { id_usuario } = req.body; // Recibir ID del usuario desde el frontend

		// Verificar si la mascota existe
		const [mascota] = await pool.query(
			"SELECT * FROM mascotas WHERE id_mascota = ?",
			[id_mascota]
		);

		if (mascota.length > 0) {
			// Cambiar el estado a "proceso adopcion" y registrar el usuario
			const [result] = await pool.query(
				"UPDATE mascotas SET estado = 'proceso adopcion', fk_id_usuario = ? WHERE id_mascota = ?",
				[id_usuario, id_mascota]
			);
			if (result.affectedRows > 0) {
				res.status(200).json({
					status: 200,
					message: "Estado de la mascota cambiado a proceso adopcion",
				});
			} else {
				res.status(404).json({
					status: 404,
					message: "No se pudo actualizar el estado de la mascota",
				});
			}
		} else {
			res.status(404).json({
				status: 404,
				message: "No se encontró la mascota",
			});
		}
	} catch (error) {
		res.status(500).json({
			status: 500,
			message: "Error en el sistema: " + error.message,
		});
	}
};

// cambio de estado a adoptado o denegado
export const administrarAdopcion = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { id_mascota } = req.params;
		const { accion } = req.body;

		const [mascotaResult] = await pool.query(
			"SELECT * FROM mascotas WHERE id_mascota = ?",
			[id_mascota]
		);
		if (mascotaResult.length === 0) {
			return res.status(404).json({
				status: 404,
				message: "No se encontró la mascota",
			});
		}

		const mascota = mascotaResult[0];

		const [usuarioResult] = await pool.query(
			"SELECT * FROM usuarios WHERE id_usuario = ?",
			[mascota.fk_id_usuario]
		);
		if (usuarioResult.length === 0) {
			return res.status(404).json({
				status: 404,
				message: "No se encontró el usuario solicitante",
			});
		}

		const usuario = usuarioResult[0];

		if (accion === "aceptar") {
			const [updateResult] = await pool.query(
				"UPDATE mascotas SET estado = 'adoptada' WHERE id_mascota = ?",
				[id_mascota]
			);
			if (updateResult.affectedRows > 0) {
				console.log("Datos del adoptante:", usuario); // Agregar console.log
				res.status(200).json({
					status: 200,
					message: "La adopción ha sido aceptada",
					adoptante: usuario,
				});
			} else {
				res.status(404).json({
					status: 404,
					message: "No se pudo actualizar el estado de la mascota",
				});
			}
		} else if (accion === "denegar") {
			const [updateResult] = await pool.query(
				"UPDATE mascotas SET estado = 'adoptar' WHERE id_mascota = ?",
				[id_mascota]
			);
			if (updateResult.affectedRows > 0) {
				res.status(200).json({
					status: 200,
					message:
						"La adopción fue denegada y la mascota está disponible para adopción nuevamente",
				});
			} else {
				res.status(404).json({
					status: 404,
					message: "No se pudo actualizar el estado de la mascota",
				});
			}
		} else {
			res.status(400).json({
				status: 400,
				message: "Acción no válida",
			});
		}
	} catch (error) {
		res.status(500).json({
			status: 500,
			message: "Error en el sistema: " + error.message,
		});
	}
};

// controlador para listar mascotas con usuarios asociados
export const listarMascotasConUsuarios = async (req, res) => {
	try {
		const [mascotasResult] = await pool.query(
			`SELECT m.*, u.id_usuario, u.nombres, u.apellidos, u.correo, u.numero_cel
             FROM mascotas m 
             JOIN usuarios u ON m.fk_id_usuario = u.id_usuario 
              WHERE m.estado IN ('proceso adopcion', 'adoptada')`
		);
		if (mascotasResult.length === 0) {
			return res.status(404).json({
				status: 404,
				message: "No se encontraron mascotas en proceso de adopción",
			});
		}

		res.status(200).json(mascotasResult);
	} catch (error) {
		res.status(500).json({
			status: 500,
			message: "Error en el sistema: " + error.message,
		});
	}
};

// Listar mascotas en proceso de adopción asociadas a un usuario
export const listarMascotasEnProceso = async (req, res) => {
	try {
		const { identificacion } = req.params; // Recibir ID del usuario desde los parámetros de la solicitud

		// Verificar que se ha proporcionado un ID de usuario
		if (!identificacion) {
			return res.status(400).json({
				status: 400,
				message: "ID de usuario requerido",
			});
		}

		// Obtener el ID de usuario asociado con la identificación proporcionada
		const [usuarioResult] = await pool.query(
			"SELECT id_usuario FROM usuarios WHERE identificacion = ?",
			[identificacion]
		);

		if (usuarioResult.length === 0) {
			return res.status(404).json({
				status: 404,
				message: "Usuario no encontrado",
			});
		}

		const { id_usuario } = usuarioResult[0];

		// Obtener las mascotas en proceso de adopción asociadas al usuario
		const [mascotas] = await pool.query(
			"SELECT * FROM mascotas WHERE fk_id_usuario = ? AND estado = 'proceso adopcion'",
			[id_usuario]
		);

		if (mascotas.length > 0) {
			res.status(200).json({
				status: 200,
				mascotas,
			});
		} else {
			res.status(404).json({
				status: 404,
				message: "No se encontraron mascotas en proceso de adopción para este usuario",
			});
		}
	} catch (error) {
		res.status(500).json({
			status: 500,
			message: "Error en el sistema: " + error.message,
		});
	}
};

// Controlador para obtener conteo de mascotas por estado
export const obtenerConteoPorEstado = async (req, res) => {
	try {
		// Consulta para obtener el conteo de mascotas por estado
		const [result] = await pool.query(`
            SELECT estado, COUNT(*) as total
            FROM mascotas
            GROUP BY estado
        `);

		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({
			status: 500,
			message: "Error en el sistema: " + error.message,
		});
	}
};

// Registrar mascota
export const registrarMascota = async (req, res) => {
	try {
		const {
			nombre,
			genero,
			raza,
			edad,
			descripcion,
			estado,
			fk_id_usuario,
			especie,
			esterilizacion,
		} = req.body;
		const img = req.file ? req.file.filename : null; // Obtener el nombre del archivo de la solicitud

		console.log(req.body); // Verificar el cuerpo de la solicitud
		console.log(req.file); // Verificar el archivo cargado

		// Verificar si fk_id_usuario existe en la tabla Usuarios
		const [userCheck] = await pool.query(
			"SELECT id_usuario FROM Usuarios WHERE id_usuario = ?",
			[fk_id_usuario]
		);
		if (userCheck.length === 0) {
			return res.status(400).json({
				status: 400,
				message: "Usuario no encontrado",
			});
		}

		const [result] = await pool.query(
			"INSERT INTO Mascotas (nombre, genero, raza, edad, img, descripcion, estado, fk_id_usuario, especie, esterilizacion) VALUES (?,?,?,?,?,?,?,?,?,?)",
			[
				nombre,
				genero,
				raza,
				edad,
				img,
				descripcion,
				estado,
				fk_id_usuario,
				especie,
				esterilizacion,
			]
		);

		if (result.affectedRows > 0) {
			res.status(200).json({
				status: 200,
				message: "Se registró la mascota",
				data: {
					nombre,
					genero,
					raza,
					edad,
					img,
					descripcion,
					estado,
					fk_id_usuario,
					especie,
					esterilizacion,
				},
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
		const { id_mascota } = req.params;
		const {
			nombre,
			genero,
			raza,
			edad,
			descripcion,
			estado,
			fk_id_usuario,
			especie,
			esterilizacion,
		} = req.body;
		const img = req.body.img;

		// Obtener la mascota actual
		const [currentMascota] = await pool.query(
			"SELECT img FROM Mascotas WHERE id_mascota=?",
			[id_mascota]
		);
		const currentFoto =
			currentMascota.length > 0 ? currentMascota[0].img : null;

		// Actualizar mascota
		const [result] = await pool.query(
			"UPDATE Mascotas SET nombre=?, genero=?, raza=?, edad=?, img=?, descripcion=?, estado=?, fk_id_usuario=?, especie=?, esterilizacion=? WHERE id_mascota=?",
			[
				nombre,
				genero,
				raza,
				edad,
				img || currentFoto,
				descripcion,
				estado,
				fk_id_usuario,
				especie,
				esterilizacion,
				id_mascota,
			]
		);

		if (result.affectedRows > 0) {
			if (img && currentFoto) {
				// Eliminar la img anterior del servidor
				fs.unlink(path.join("uploads", currentFoto), (err) => {
					if (err) console.error("No se pudo eliminar la img anterior:", err);
				});
			}

			res.status(200).json({
				status: 200,
				message: "Se actualizó la mascota",
				data: { ...req.body, img: img || currentFoto },
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

// Eliminar mascota por ID
export const eliminarMascota = async (req, res) => {
	try {
	  const { id_mascota } = req.params;
  
	  // Obtener la imagen de la mascota antes de eliminar
	  const [mascota] = await pool.query(
		"SELECT img FROM Mascotas WHERE id_mascota = ?",
		[id_mascota]
	  );
  
	  if (mascota.length === 0) {
		return res.status(404).json({
		  status: 404,
		  message: "No se encontró la mascota",
		});
	  }
  
	  const img = mascota[0].img;
  
	  // Primero eliminar las vacunas asociadas a la mascota
	  await pool.query(
		"DELETE FROM Vacunas WHERE fk_id_mascota = ?",
		[id_mascota]
	  );
  
	  // Eliminar el registro de la mascota
	  const [result] = await pool.query(
		"DELETE FROM Mascotas WHERE id_mascota = ?",
		[id_mascota]
	  );
  
	  if (result.affectedRows > 0) {
		// Eliminar la imagen del servidor si existe
		if (img) {
		  fs.unlink(path.join("uploads", img), (err) => {
			if (err) {
			  console.error("No se pudo eliminar la imagen:", err);
			}
		  });
		}
  
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
