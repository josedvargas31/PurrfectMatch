import { check } from "express-validator";

export const validateRegistroVacuna = [
	check(
		"fk_id_mascota",
		"El ID de la mascota es obligatorio y debe ser un número entero"
	)
		.not()
		.isEmpty()
		.isInt(),

	check(
		"fecha_vacuna",
		"La fecha de la vacuna es obligatoria y debe ser una fecha válida 0000-00-00"
	)
		.not()
		.isEmpty()
		.isISO8601(),

	check(
		"enfermedad",
		"La enfermedad es obligatoria y debe tener un máximo de 100 caracteres"
	)
		.not()
		.isEmpty()
		.isLength({ max: 100 }),

	check(
		"estado",
		"El estado debe ser uno de los siguientes valores: Completa, Incompleta, En proceso, no se"
	)
		.optional()
		.isIn(["Completa", "Incompleta", "En proceso", "no se"]),
];

export const validateActualizarVacuna = [
	check(
		"fk_id_mascota",
		"El ID de la mascota es obligatorio y debe ser un número entero"
	)
		.optional()
		.not()
		.isEmpty()
		.isInt(),

	check(
		"fecha_vacuna",
		"La fecha de la vacuna es obligatoria y debe ser una fecha válida"
	)
		.optional()
		.not()
		.isEmpty()
		.isISO8601(),

	check(
		"enfermedad",
		"La enfermedad es obligatoria y debe tener un máximo de 100 caracteres"
	)
		.optional()
		.not()
		.isEmpty()
		.isLength({ max: 100 }),

	check(
		"estado",
		"El estado debe ser uno de los siguientes valores: Completa, Incompleta, En proceso, no se"
	)
		.optional()
		.optional()
		.isIn(["Completa", "Incompleta", "En proceso", "no se"]),

	check(
		"fk_id_usuario",
		"El ID del usuario es obligatorio y debe ser un número entero"
	)
		.optional()
		.not()
		.isEmpty()
		.isInt(),
];
