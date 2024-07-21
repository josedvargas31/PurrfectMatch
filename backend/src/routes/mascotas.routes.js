import { Router } from 'express';
import {
  listarMascotas,
  registrarMascota,
  actualizarMascota,
  eliminarMascota,
  buscarMascota,
} from '../controllers/mascotas.controller.js';
import {
  validateRegistroMascota,
  validateActualizarMascota,
} from '../validation/mascota.validation.js';
import upload from '../config/multer.config.js';  // Importar configuración de multer
import { uploadImage, deleteImage } from '../controllers/imagenes.controller.js';

const mascotaRoutes = Router();

mascotaRoutes.get('/listar', listarMascotas);
mascotaRoutes.post('/registrar', upload.single('img'), uploadImage, validateRegistroMascota, registrarMascota);
mascotaRoutes.put('/actualizar/:id_mascota', upload.single('img'), uploadImage, validateActualizarMascota, actualizarMascota);
mascotaRoutes.delete('/eliminar/:id_mascota', eliminarMascota); 
mascotaRoutes.get('/buscar/:id', buscarMascota);

export default mascotaRoutes;
