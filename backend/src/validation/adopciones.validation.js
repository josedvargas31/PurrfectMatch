import { check } from "express-validator";

// validacion de registro de mascotas
export const validateRegistroAdoptar = [
	check(
		"fk_id_mascota",
		"El ID de la mascota es obligatorio y debe ser un número entero"
	)
		.not()
		.isEmpty()
		.isInt(),

	check(
		"fk_id_usuario_adoptante",
		"El ID del usuario adoptante es obligatorio y debe ser un número entero"
	)
		.not()
		.isEmpty()
		.isInt(),

	check("fecha_adopcion", "La fecha de adopción debe ser una fecha válida")
		.optional()
		.isISO8601(),

	check(
		"estado",
		"El estado es obligatorio y debe ser uno de los siguientes valores: aceptada, rechazada"
	)
		.not()
		.isEmpty()
		.isIn(["aceptada", "rechazada"]),
];

// validacion de actualizar de mascotas
export const validateActualizarAdoptar = [
	check("fk_id_mascota", "El ID de la mascota debe ser un número entero")
		.optional()
		.isInt(),

	check(
		"fk_id_usuario_adoptante",
		"El ID del usuario adoptante debe ser un número entero"
	)
		.optional()
		.isInt(),

	check("fecha_adopcion", "La fecha de adopción debe ser una fecha válida")
		.optional()
		.isISO8601(),

	check(
		"estado",
		"El estado debe ser uno de los siguientes valores: aceptada, rechazada"
	)
		.optional()
		.isIn(["aceptada", "rechazada"]),
];
