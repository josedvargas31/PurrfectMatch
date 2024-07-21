import { pool } from "../database/conexion.js";
import { validationResult } from "express-validator";

// listar adopciones
export const listarAdopciones = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM adopciones");
        if (result.length > 0) {
            res.status(200).json({
                status: 200,
                message: "Lista de adopciones",
                data: result,
            });
        } else {
            res.status(403).json({
                status: 403,
                message: "No hay adopciones para listar",
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Error en el servidor " + error.message,
        });
    }
};

// registrar adopcion
export const registrarAdopcion = async (req, res) => {
    try {
        const { fk_id_mascota, fk_id_usuario_adoptante, fecha_adopcion, estado } = req.body;
        
        // Validación de los datos de registrar adopción
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(404).json({ errors: errors.array() });
        }
        
        const [result] = await pool.query(
            "INSERT INTO adopciones (fk_id_mascota, fk_id_usuario_adoptante, fecha_adopcion, estado) VALUES (?,?,?,?)",
            [fk_id_mascota, fk_id_usuario_adoptante, fecha_adopcion, estado]
        );
        if (result.affectedRows > 0) {
            res.status(200).json({
                status: 200,
                message: "Se registró la adopción",
            });
        } else {
            res.status(403).json({
                status: 403,
                message: "No se registró la adopción",
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Error en el servidor " + error.message,
        });
    }
};

// actualizar adopcion
export const actualizarAdopcion = async (req, res) => {
    try {
        const { id_adopcion } = req.params;
        const { fk_id_mascota, fk_id_usuario_adoptante, fecha_adopcion, estado } = req.body;
        const [result] = await pool.query(
            "UPDATE adopciones SET fk_id_mascota=?, fk_id_usuario_adoptante=?, fecha_adopcion=?, estado=? WHERE id_adopcion=?",
            [fk_id_mascota, fk_id_usuario_adoptante, fecha_adopcion, estado, id_adopcion]
        );
        if (result.affectedRows > 0) {
            res.status(200).json({
                status: 200,
                message: "Se actualizó la adopción",
            });
        } else {
            res.status(403).json({
                status: 403,
                message: "No se actualizó la adopción",
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Error en el servidor " + error.message,
        });
    }
};

// eliminar adopcion por ID
export const eliminarAdopcion = async (req, res) => {
    try {
        const { id_adopcion } = req.params;
        const [result] = await pool.query(
            "DELETE FROM adopciones WHERE id_adopcion=?", [id_adopcion]
        );
        if (result.affectedRows > 0) {
            res.status(200).json({
                status: 200,
                message: "Se eliminó la adopción",
            });
        } else {
            res.status(403).json({
                status: 403,
                message: "No se eliminó la adopción",
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Error en el servidor " + error.message,
        });
    }
};

// buscar adopcion por ID
export const buscarAdopcion = async (req, res) => {
    try {
        const { id_adopcion } = req.params;
        const [result] = await pool.query("SELECT * FROM adopciones WHERE id_adopcion=?", [id_adopcion]);
        if (result.length > 0) {
            res.status(200).json({
                status: 200,
                message: "Adopción encontrada",
                data: result[0],
            });
        } else {
            res.status(403).json({
                status: 403,
                message: "Adopción no encontrada",
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Error en el servidor " + error.message,
        });
    }
};
