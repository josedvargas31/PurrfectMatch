import { check } from "express-validator";

// validación de regsitro de usuario
export const validateRegistroUsuario = [
	check(
		"identificacion",
		"Identificación es obligatoria y debe contener solo números"
	)
		.not()
		.isEmpty()
		.isNumeric(),

	check(
		"nombres",
		"El nombre es obligatorio y debe contener solo letras, máximo 50 caracteres"
	)
		.not()
		.isEmpty()
		.isLength({ max: 50 })
		.matches(/^[A-Za-z\s]+$/),

	check(
		"apellidos",
		"El apellido es obligatorio y debe contener solo letras, máximo 50 caracteres"
	)
		.not()
		.isEmpty()
		.isLength({ max: 50 })
		.matches(/^[A-Za-z\s]+$/),

	check("correo", "Correo es obligatorio y debe ser un correo válido")
		.not()
		.isEmpty()
		.isEmail()
		.normalizeEmail(),

	check(
		"numero_cel",
		"El número de celular es obligatorio y debe contener solo números, máximo 15 caracteres"
	)
		.not()
		.isEmpty()
		.isLength({ max: 15 })
		.isNumeric(),

	check(
		"password",
		"La contraseña es obligatoria y debe tener al menos 6 caracteres"
	)
		.not()
		.isEmpty()
		.isLength({ min: 6 }),

	check(
		"rol",
		"Rol es obligatorio y debe ser uno de los siguientes valores: administrador, usuario"
	)
		.not()
		.isEmpty()
		.isIn(["administrador", "usuario"]),
];

// validación de actualizar usuario
export const validateActualizarUsuario = [
	check(
		"identificacion",
		"Identificación es obligatorio y debe contener solo números"
	)
		.optional()
		.not()
		.isEmpty()
		.isNumeric(),

	check(
		"nombres",
		"El nombre es obligatorio y debe contener solo letras, máximo 50 caracteres"
	)
		.optional()
		.not()
		.isEmpty()
		.isLength({ max: 50 })
		.matches(/^[A-Za-z\s]+$/),

	check(
		"apellidos",
		"El apellido es obligatorio y debe contener solo letras, máximo 50 caracteres"
	)
		.optional()
		.not()
		.isEmpty()
		.isLength({ max: 50 })
		.matches(/^[A-Za-z\s]+$/),

	check("correo", "Correo debe ser un correo válido")
		.optional()
		.not()
		.isEmpty()
		.isEmail()
		.normalizeEmail(),

	check(
		"numero_cel",
		"El número de celular debe contener solo números, máximo 15 caracteres"
	)
		.optional()
		.not()
		.isEmpty()
		.isLength({ max: 15 })
		.isNumeric(),

	check("password", "La contraseña debe tener al menos 6 caracteres")
		.optional()
		.not()
		.isEmpty()
		.isLength({ min: 6 }),

	check(
		"rol",
		"Rol debe ser uno de los siguientes valores: administrador, usuario"
	)
		.optional()
		.not()
		.isEmpty()
		.isIn(["administrador", "usuario"]),
];
