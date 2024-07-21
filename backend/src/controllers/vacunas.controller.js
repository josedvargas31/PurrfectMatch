import { pool } from "../database/conexion.js";
import { validationResult } from "express-validator";
// Listar vacunas
export const listarVacunas = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM Vacunas");
    if (result.length > 0) {
      res.status(200).json({
        status: 200,
        message: "Lista de las vacunas",
        data: result,
      });
    } else {
      res.status(403).json({
        status: 403,
        message: "No hay vacunas para listar",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error en el servidor " + error.message,
    });
  }
};

// Registrar vacuna
export const registrarVacuna = async (req, res) => {
  try {
    const { fk_id_mascota, fecha_vacuna, enfermedad, estado, fk_id_usuario } = req.body;
    const [result] = await pool.query(
      "INSERT INTO Vacunas (fk_id_mascota, fecha_vacuna, enfermedad, estado, fk_id_usuario) VALUES (?,?,?,?,?)",
      [fk_id_mascota, fecha_vacuna, enfermedad, estado, fk_id_usuario]
    );
          /* validación de los datos de actualizar vacuna */
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(404).json({ errors: errors.array() });
		}
    if (result.affectedRows > 0) {
      res.status(200).json({
        status: 200,
        message: "Se registró la vacuna",
      });
    } else {
      res.status(403).json({
        status: 403,
        message: "No se registró la vacuna",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error en el servidor " + error.message,
    });
  }
};

// Actualizar vacuna por ID
export const actualizarVacuna = async (req, res) => {
  try {
    const { id_vacuna } = req.params;
    const { fk_id_mascota, fecha_vacuna, enfermedad, estado, fk_id_usuario } = req.body;
    const [result] = await pool.query(
      "UPDATE Vacunas SET fk_id_mascota=?, fecha_vacuna=?, enfermedad=?, estado=?, fk_id_usuario=? WHERE id_vacuna=?",
      [fk_id_mascota, fecha_vacuna, enfermedad, estado, fk_id_usuario, id_vacuna]
    );
          /* validación de los datos de actualizar vacuna */
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(404).json({ errors: errors.array() });
		}
    if (result.affectedRows > 0) {
      res.status(200).json({
        status: 200,
        message: "Se actualizó la vacuna",
      });
    } else {
      res.status(403).json({
        status: 403,
        message: "No se actualizó la vacuna",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error en el servidor " + error.message,
    });
  }
};

// eliminar vacuna por ID
export const eliminarVacuna = async (req, res) => {
  try {
    const { id_vacuna } = req.params;
    const [result] = await pool.query("DELETE FROM Vacunas WHERE id_vacuna=?", [id_vacuna]);
    if (result.affectedRows > 0) {
      res.status(200).json({
        status: 200,
        message: "Se eliminó la vacuna",
      });
    } else {
      res.status(403).json({
        status: 403,
        message: "No se eliminó la vacuna",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error en el servidor " + error.message,
    });
  }
};

// buscar vacuna por ID
export const buscarVacuna = async (req, res) => {
  try {
    const { id_vacuna } = req.params;
    const [result] = await pool.query("SELECT * FROM Vacunas WHERE id_vacuna=?", [id_vacuna]);
    if (result.length > 0) {
      res.status(200).json({
        status: 200,
        message: "Vacuna encontrada",
        data: result[0],
      });
    } else {
      res.status(403).json({
        status: 403,
        message: "Vacuna no encontrada",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error en el servidor " + error.message,
    });
  }
};
