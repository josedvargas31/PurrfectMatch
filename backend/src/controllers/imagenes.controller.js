import multer from "multer";
import path from "path";

// Configurar el almacenamiento de archivos
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/usuarios");
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(
			null,
			file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
		); // Nombre del archivo
	},
});

const upload = multer({ storage: storage });

export default upload;
