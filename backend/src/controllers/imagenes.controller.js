import fs from 'fs';
import path from 'path';

// Configuración del tamaño máximo para la imagen
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB en bytes

// Middleware para manejar la subida de imágenes
export const uploadImage = (req, res, next) => {
  if (req.file) {
    const fileType = req.file.mimetype;

    // Verifica si el archivo es una imagen
    if (!fileType.startsWith('image/')) {
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error('Error al eliminar el archivo de tipo no permitido:', err);
        }
      });
      return res.status(400).json({
        status: 400,
        message: 'Solo se permiten archivos de imagen'
      });
    }

    // Verifica el tamaño del archivo
    if (req.file.size > MAX_SIZE) {
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error('Error al eliminar el archivo demasiado grande:', err);
        }
      });
      return res.status(400).json({
        status: 400,
        message: 'El tamaño del archivo excede el límite permitido'
      });
    }

    req.body.img = req.file.filename;
  }
  next();
};

// Middleware para eliminar la imagen anterior (si existe)
export const deleteImage = (req, res, next) => {
  const { img } = req.body;
  if (img) {
    const filePath = path.join('uploads', img);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('No se pudo eliminar la imagen anterior:', err);
      }
    });
  }
  next();
};
