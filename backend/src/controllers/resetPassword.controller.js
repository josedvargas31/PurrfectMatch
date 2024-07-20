/* import { pool } from "../database/conexion.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;

        // Verificar y decodificar el token
        const decoded = jwt.verify(token, "estemensajedebeserlargoyseguro");
        const userId = decoded.identificacion; 

        // Consultar el usuario por su ID
        const sql = "SELECT * FROM usuarios WHERE identificacion = ?";
        const [usuario] = await pool.query(sql, [userId]);

        if (usuario.length === 0) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const sqlUpdate = "UPDATE usuarios SET password = ? WHERE identificacion = ?";
        const [actualizar] = await pool.query(sqlUpdate, [hashedPassword, userId]);

        if (actualizar.affectedRows > 0) {
            return res.status(200).json({ message: "Contraseña actualizada" });
        } else {
            return res.status(400).json({ message: "No se pudo actualizar la contraseña" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al restablecer la contraseña" });
    }
}; */