import { pool } from "../database/conexion.js";
import fs from "fs";
import path from "path";
import { validationResult } from 'express-validator';

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

        // Verificar si la mascota existe
        const [mascota] = await pool.query("SELECT * FROM mascotas WHERE id_mascota = ?", [id_mascota]);

        if (mascota.length > 0) {
            // Cambiar el estado a "proceso adopcion"
            const [result] = await pool.query("UPDATE mascotas SET estado = 'proceso adopcion' WHERE id_mascota = ?", [id_mascota]);
            if (result.affectedRows > 0) {
                res.status(200).json({
                    status: 200,
                    message: 'Estado de la mascota cambiado a proceso adopcion'
                });
            } else {
                res.status(404).json({
                    status: 404,
                    message: 'No se pudo actualizar el estado de la mascota'
                });
            }
        } else {
            res.status(404).json({
                status: 404,
                message: 'No se encontró la mascota'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error en el sistema: ' + error.message
        });
    }
};

// cambio de estado a adoptado a adaptar
export const administrarAdopcion = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id_mascota } = req.params;
        const { accion } = req.body; // "aceptar" o "denegar"

        // Verificar si la mascota existe
        const [mascota] = await pool.query("SELECT * FROM mascotas WHERE id_mascota = ?", [id_mascota]);

        if (mascota.length > 0) {
            if (accion === 'aceptar') {
                // Eliminar la mascota de la base de datos
                const [result] = await pool.query("DELETE FROM mascotas WHERE id_mascota = ?", [id_mascota]);
                if (result.affectedRows > 0) {
                    res.status(200).json({
                        status: 200,
                        message: 'La mascota ha sido adoptada y eliminada de la base de datos'
                    });
                } else {
                    res.status(404).json({
                        status: 404,
                        message: 'No se pudo eliminar la mascota de la base de datos'
                    });
                }
            } else if (accion === 'denegar') {
                // Cambiar el estado a "adoptar"
                const [result] = await pool.query("UPDATE mascotas SET estado = 'adoptar' WHERE id_mascota = ?", [id_mascota]);
                if (result.affectedRows > 0) {
                    res.status(200).json({
                        status: 200,
                        message: 'La adopción fue denegada y la mascota está disponible para adopción nuevamente'
                    });
                } else {
                    res.status(404).json({
                        status: 404,
                        message: 'No se pudo actualizar el estado de la mascota'
                    });
                }
            } else {
                res.status(400).json({
                    status: 400,
                    message: 'Acción no válida'
                });
            }
        } else {
            res.status(404).json({
                status: 404,
                message: 'No se encontró la mascota'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error en el sistema: ' + error.message
        });
    }
};

// Registrar mascota
export const registrarMascota = async (req, res) => {
	try {
		const { nombre, genero, raza, edad, descripcion, estado, fk_id_usuario } =
			req.body;
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
			"INSERT INTO Mascotas (nombre, genero, raza, edad, img, descripcion, estado, fk_id_usuario) VALUES (?,?,?,?,?,?,?,?)",
			[nombre, genero, raza, edad, img, descripcion, estado, fk_id_usuario]
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
		const { nombre, genero, raza, edad, descripcion, estado, fk_id_usuario } =
			req.body;
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
			"UPDATE Mascotas SET nombre=?, genero=?, raza=?, edad=?, img=?, descripcion=?, estado=?, fk_id_usuario=? WHERE id_mascota=?",
			[
				nombre,
				genero,
				raza,
				edad,
				img || currentFoto,
				descripcion,
				estado,
				fk_id_usuario,
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
