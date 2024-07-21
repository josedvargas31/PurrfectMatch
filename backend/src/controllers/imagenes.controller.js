import fs from 'fs';
import path from 'path';

// Middleware para manejar la subida de imágenes
export const uploadImage = (req, res, next) => {
  if (req.file) {
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
