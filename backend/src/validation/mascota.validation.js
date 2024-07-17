import { check } from "express-validator";

// validacion de registro de mascotas
export const validateRegistroMascota = [
    check("nombre", "El nombre de la mascota es obligatorio").notEmpty(),
    check("genero", "El genero  de la mascota es obligatorio y solo debe permitir estas opciones macho o hembra").isIn("macho","hembra"),
    check("raza", "La raza  de la mascota es obligatoria").notEmpty(),
    check("edad", "La edad  de la mascota es obligatoria").notEmpty(),
    check("ubicacion", "La ubicación de la mascota es obligatoria").notEmpty(),
    check("descripcion", "La descripción de la mascota es obligatoria").notEmpty()
]
// validacion de actualzair de mascota
export const validateActualizarMascota = [
    check("nombre", "El nombre de la mascota es obligatorio").notEmpty(),
    check("genero", "El genero  de la mascota es obligatorio y solo debe permitir estas opciones macho o hembra").isIn("macho","hembra"),
    check("raza", "La raza  de la mascota es obligatoria").notEmpty(),
    check("edad", "La edad  de la mascota es obligatoria").notEmpty(),
    check("ubicacion", "La ubicación de la mascota es obligatoria").notEmpty(),
    check("descripcion", "La descripción de la mascota es obligatoria").notEmpty()
]


