import { check } from "express-validator";

// validación de regsitro de usuario
export const validateRegistroUsuario = [
	check(
		"identificacion",
		"La identificacion del usuario es obligatoria"
	).notEmpty(),
	check("npombres", "La identificacion del usuario es obligatoria").notEmpty(),
	check("apellidos", "La identificacion del usuario es obligatoria").notEmpty(),
	check("correo", "La identificacion del usuario es obligatoria").notEmpty(),
	check("telefono", "La identificacion del usuario es obligatoria").notEmpty(),
	check("password", "La identificacion del usuario es obligatoria").notEmpty(),
	check(
		"rol",
		"El rol solo deben ser estas opciones administrador o usuario"
	).isIn("administrador", "usuario"),
];

// validación de actualizar usuario
export const validateActualizarUsuario = [
	check(
		"identificacion",
		"La identificacion del usuario es obligatoria"
	).notEmpty(),
	check("npombres", "La identificacion del usuario es obligatoria").notEmpty(),
	check("apellidos", "La identificacion del usuario es obligatoria").notEmpty(),
	check("correo", "La identificacion del usuario es obligatoria").notEmpty(),
	check("telefono", "La identificacion del usuario es obligatoria").notEmpty(),
	check("password", "La identificacion del usuario es obligatoria").notEmpty(),
	check(
		"rol",
		"El rol solo deben ser estas opciones administrador o usuario"
	).isIn("administrador", "usuario"),
];
