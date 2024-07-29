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

// listar perfil
export const perfil = async (req, res) => {
	try {
		const identificacion = req.usuario;

		const [result] = await pool.query(
			`
            SELECT  
                u.nombres,
                u.identificacion,
                u.apellidos,
                u.correo,
                u.rol
            FROM 
                usuarios u
            WHERE 
                u.identificacion = ?;
        `,
			[identificacion]
		);

		if (result.length > 0) {
			res.status(200).json({
				status: 200,
				data: result[0],
			});
		} else {
			res.status(404).json({
				status: 404,
				message: "No se encontró la información del usuario",
			});
		}
	} catch (error) {
		res.status(500).json({
			status: 500,
			message: "Error en el sistema: " + error.message,
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
			numero_cel,
			password,
			rol,
		} = req.body;
		const [result] = await pool.query(
			"INSERT INTO usuarios (identificacion, nombres, apellidos, correo, numero_cel, password, rol) VALUES (?,?,?,?,?,?,?)",
			[identificacion, nombres, apellidos, correo, numero_cel, password, rol]
		);
		/* validación de los datos de registrar usuario */
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(404).json({ errors: errors.array() });
		}
		if (result.affectedRows > 0) {
			res.status(200).json({
				status: 200,
				message: "Se registro el usuario",
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

// actualizar perfil
export const actualizarPerfil = async (req, res) => {
	try {
	  const errors = validationResult(req);
	  if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	  }
  
	  const { id_usuario } = req.params;
	  console.log("ID de usuario recibido en los parámetros:", id_usuario);
  
	  const { nombres, apellidos, correo } = req.body;
	  console.log("Datos del cuerpo de la solicitud:", {
		nombres,
		apellidos,
		correo,
	  });
  
	  const [oldUsuario] = await pool.query(
		"SELECT * FROM usuarios WHERE id_usuario = ?",
		[id_usuario]
	  );
	  console.log("Resultado de la consulta del usuario:", oldUsuario);
  
	  if (oldUsuario.length === 0) {
		return res.status(404).json({
		  status: 404,
		  message: "Usuario no encontrado",
		});
	  }
  
	  const updatedUsuario = {
		nombres: nombres || oldUsuario[0].nombres,
		apellidos: apellidos || oldUsuario[0].apellidos,
		correo: correo || oldUsuario[0].correo,
	  };
  
	  const [result] = await pool.query(
		"UPDATE usuarios SET nombres=?, apellidos=?, correo=? WHERE id_usuario = ?",
		[
		  updatedUsuario.nombres,
		  updatedUsuario.apellidos,
		  updatedUsuario.correo,
		  id_usuario,
		]
	  );
  
	  console.log("Resultado de la actualización:", result);
  
	  if (result.affectedRows > 0) {
		res.status(200).json({
		  status: 200,
		  message: "El perfil del usuario ha sido actualizado.",
		});
	  } else {
		res.status(500).json({
		  status: 500,
		  message: "Hubo un problema al actualizar el perfil.",
		});
	  }
	} catch (error) {
	  console.error("Error en la actualización del perfil:", error);
	  res.status(500).json({
		status: 500,
		message: "Error interno del servidor",
	  });
	}
  };
  
// actualizar usuario
export const actualizarUsuario = async (req, res) => {
	try {
		const { id_usuario } = req.params;
		const {
			identificacion,
			nombres,
			apellidos,
			correo,
			numero_cel,
			password,
			rol,
		} = req.body;
		const [result] = await pool.query(
			"UPDATE usuarios SET identificacion=?, nombres=?, apellidos=?, correo=?, numero_cel=?, password=?, rol=? WHERE id_usuario=?",
			[
				identificacion,
				nombres,
				apellidos,
				correo,
				numero_cel,
				password,
				rol,
				id_usuario,
			]
		);
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

// eliminar usuario por ID
export const eliminarUsuario = async (req, res) => {
	try {
		const { id_usuario } = req.params;
		const [result] = await pool.query(
			"DELETE FROM usuarios WHERE id_usuario=?",
			[id_usuario]
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

// buscar usuario por ID
export const buscarUsuario = async (req, res) => {
	try {
		const { id_usuario } = req.params;
		const [result] = await pool.query(
			"SELECT * FROM Usuarios WHERE id_usuario=?",
			[id_usuario]
		);
		if (result.length > 0) {
			res.status(200).json({
				status: 200,
				message: "Usuario encontrado",
				data: result[0],
			});
		} else {
			res.status(403).json({
				status: 403,
				message: "Usuario no encontrado",
			});
		}
	} catch (error) {
		res.status(500).json({
			status: 500,
			message: "Error en el servidor " + error.message,
		});
	}
};
