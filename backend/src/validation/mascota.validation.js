import { check } from "express-validator";

// validacion de registro de mascotas
export const validateRegistroMascota = [
	check(
		"nombre",
		"El nombre es obligatorio y debe contener solo letras, máximo 50 caracteres"
	)
		.not()
		.isEmpty()
		.isLength({ max: 50 })
		.matches(/^[A-Za-z\s]+$/),

	check(
		"genero",
		"El género es obligatorio y debe ser uno de los siguientes valores: Macho, Hembra"
	)
		.not()
		.isEmpty()
		.isIn(["Macho", "Hembra"]),

	check(
		"raza",
		"La raza es obligatoria y debe contener solo letras, máximo 50 caracteres"
	)
		.not()
		.isEmpty()
		.isLength({ max: 50 })
		.matches(/^[A-Za-z\s]+$/),

	check("edad", "La edad es obligatoria y debe ser un número entero")
		.not()
		.isEmpty()
		.isInt(),

	check(
		"foto",
		"La URL de la foto debe ser válida y no debe exceder 255 caracteres"
	)
		.optional()
		.isLength({ max: 255 })
		.isURL(),

	check(
		"descripcion",
		"La descripción es obligatoria y debe tener un máximo de 300 caracteres"
	)
		.not()
		.isEmpty()
		.isLength({ max: 300 }),

	check(
		"estado",
		"El estado es obligatorio y debe ser uno de los siguientes valores: adoptar, adoptada, proceso adopcion"
	)
		.not()
		.isEmpty()
		.isIn(["adoptar", "adoptada", "proceso adopcion"]),

	check(
		"fk_id_usuario",
		"El ID del usuario es obligatorio y debe ser un número entero"
	)
		.not()
		.isEmpty()
		.isInt(),
];

// validacion de actualizar de mascota
export const validateActualizarMascota = [
	check(
		"nombre",
		"El nombre es obligatorio y debe contener solo letras, máximo 50 caracteres"
	)
		.optional()
		.not()
		.isEmpty()
		.isLength({ max: 50 })
		.matches(/^[A-Za-z\s]+$/),

	check(
		"genero",
		"El género es obligatorio y debe ser uno de los siguientes valores: Macho, Hembra"
	)
		.optional()
		.not()
		.isEmpty()
		.isIn(["Macho", "Hembra"]),

	check(
		"raza",
		"La raza es obligatoria y debe contener solo letras, máximo 50 caracteres"
	)
		.optional()
		.not()
		.isEmpty()
		.isLength({ max: 50 })
		.matches(/^[A-Za-z\s]+$/),

	check("edad", "La edad es obligatoria y debe ser un número entero")
		.optional()
		.not()
		.isEmpty()
		.isInt(),

	check(
		"foto",
		"La URL de la foto debe ser válida y no debe exceder 255 caracteres"
	)
		.optional()
		.optional()
		.isLength({ max: 255 })
		.isURL(),

	check(
		"descripcion",
		"La descripción es obligatoria y debe tener un máximo de 300 caracteres"
	)
		.optional()
		.not()
		.isEmpty()
		.isLength({ max: 300 }),

	check(
		"estado",
		"El estado es obligatorio y debe ser uno de los siguientes valores: adoptar, adoptada, proceso adopcion"
	)
		.optional()
		.not()
		.isEmpty()
		.isIn(["adoptar", "adoptada", "proceso adopcion"]),

	check(
		"fk_id_usuario",
		"El ID del usuario es obligatorio y debe ser un número entero"
	)
		.optional()
		.not()
		.isEmpty()
		.isInt(),
];
