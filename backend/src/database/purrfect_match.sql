-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-08-2024 a las 15:10:13
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `purrfect_match`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mascotas`
--

CREATE TABLE `mascotas` (
  `id_mascota` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `genero` enum('Macho','Hembra') NOT NULL,
  `raza` varchar(50) NOT NULL,
  `edad` int(11) NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  `descripcion` varchar(300) NOT NULL,
  `estado` enum('adoptar','adoptada','proceso adopcion') NOT NULL,
  `fk_id_usuario` int(11) DEFAULT NULL,
  `especie` varchar(50) NOT NULL,
  `esterilizacion` enum('si','no','no se') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mascotas`
--

INSERT INTO `mascotas` (`id_mascota`, `nombre`, `genero`, `raza`, `edad`, `img`, `descripcion`, `estado`, `fk_id_usuario`, `especie`, `esterilizacion`) VALUES
(1, 'Chillon', 'Macho', 'Criollo', 5, 'img-1722406675989-203110810.JPG', 'Mirada suave y pelaje abundante, siempre listo para un abrazo. Su tamaño imponente contrasta con su naturaleza tranquila y protectora.', 'adoptada', 4, 'Perro', 'si'),
(2, 'Chiribico', 'Macho', 'Criollo', 5, 'img-1722406718302-675174420.jpeg', 'Lleno de energía, con ojos brillantes y una cola que parece un motor en constante movimiento. Adora los juegos mentales y las actividades al aire libre.', 'proceso adopcion', 4, 'Perro', 'si'),
(3, 'Chispitas', 'Hembra', 'Criollo', 6, 'img-1722406761306-803433814.jpeg', 'Cara arrugada y orejas erguidas, siempre dispuesto a hacer reír con sus travesuras. Su pequeño tamaño no le impide tener una gran personalidad.', 'adoptada', 4, 'Perro', 'si'),
(4, 'Dante', 'Macho', 'Criollo', 4, 'img-1722406820649-405711535.JPG', ' Un Galgo de cuerpo esbelto y patas largas, con un aire aristocrático y una velocidad sorprendente. A pesar de su apariencia delicada, es un perro muy cariñoso.', 'adoptar', 1, 'Perro', 'si'),
(5, 'Fox', 'Macho', 'Criollo', 4, 'img-1722406858794-258527387.jpeg', 'Musculatura fuerte y expresión seria, pero con un corazón de oro. Su lealtad hacia su familia es inquebrantable.', 'adoptar', 1, 'Perro', 'si'),
(6, 'Mascara', 'Macho', 'Criollo', 3, 'img-1722406900622-119356898.JPG', 'Pelo dorado y sonrisa contagiosa. Adora nadar, jugar a la pelota y explorar nuevos lugares.', 'adoptar', 1, 'Perro', 'si'),
(7, 'Nena', 'Hembra', 'Criollo', 6, 'img-1722406951366-873784961.JPG', 'Ojos azules y pelaje grueso, diseñado para soportar el frío extremo. Su energía es inagotable y necesita mucho ejercicio.', 'adoptar', 1, 'Perro', 'si'),
(8, 'Nuche', 'Hembra', 'Criollo', 4, 'img-1722406989273-1167030.JPG', 'Carácter dulce y paciente. Adora a los niños y es ideal para familias.', 'adoptar', 1, 'Perro', 'si'),
(9, 'Princesa', 'Hembra', 'Criollo', 5, 'img-1722407061771-822215444.JPG', 'Patas cortas y energía inagotable. Siempre alerta y listo para ladrar ante cualquier sonido extraño.', 'adoptar', 1, 'Perro', 'si'),
(10, 'Rifle', 'Macho', 'Criollo', 5, 'img-1722407118883-818512561.JPG', 'Pelo rizado y resistente al agua. Es un excelente nadador y disfruta mucho de los juegos acuáticos.', 'adoptar', 1, 'Perro', 'si'),
(11, 'Rufo', 'Macho', 'Criollo', 2, 'img-1722407163652-792661403.JPG', 'Cuerpo robusto y orejas largas. Es un perro de caza muy silencioso y tenaz.', 'adoptar', 1, 'Perro', 'no'),
(12, 'Solovino', 'Macho', 'Criollo', 3, 'img-1722407199741-200041432.JPG', ' Orejas largas y nariz húmeda, con un olfato increíble. Siempre está buscando algo que olfatear y es un experto en escapar.', 'adoptar', 1, 'Perro', 'si'),
(13, 'Vainilla', 'Macho', 'Criollo', 4, 'img-1722407238803-875513566.JPG', 'Cuerpo imponente y corazón tierno. A pesar de su tamaño, es un perro muy tranquilo y cariñoso con los niños.', 'adoptar', 1, 'Perro', 'si'),
(14, 'Zuricata', 'Hembra', 'Criollo', 4, 'img-1722407290516-231700529.jpeg', 'Orejas largas y nariz húmeda, con un olfato increíble. Siempre está buscando algo que olfatear y es un experto en escapar.', 'adoptar', 1, 'Perro', 'si'),
(15, 'colas', 'Macho', 'Criollo', 2, 'img-1722517341649-940234594.png', 'es una mascota con cola hermosa', 'adoptar', 1, 'Perro', 'si');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `identificacion` int(11) NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `numero_cel` varchar(15) NOT NULL,
  `password` varchar(200) NOT NULL,
  `rol` enum('administrador','usuario') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `identificacion`, `nombres`, `apellidos`, `correo`, `numero_cel`, `password`, `rol`) VALUES
(1, 1077848366, 'Jose D', 'Zamora Vargas', 'jose@gmail.com', '3158716879', '12345', 'administrador'),
(4, 108423200, 'Miguel A', 'Perez Vargas', 'miguel@gmail.com', '123456789', '12345', 'usuario'),
(7, 108423200, 'Pepito A', 'Perez Vargas', 'pepito@gmail.com', '1234567890', '1234', 'usuario'),
(10, 12345, 'alejo p', 'pasaje', 'pasaje@gmail.com', '123456789', '123456', 'usuario'),
(14, 1234567890, 'qwe', 'pasaje', 'luci@12.com', '22121212', '1234567', 'usuario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vacunas`
--

CREATE TABLE `vacunas` (
  `id_vacuna` int(11) NOT NULL,
  `fk_id_mascota` int(11) DEFAULT NULL,
  `fecha_vacuna` date NOT NULL,
  `enfermedad` varchar(100) NOT NULL,
  `estado` enum('Completa','Incompleta','En proceso','no se') DEFAULT NULL,
  `fk_id_usuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vacunas`
--

INSERT INTO `vacunas` (`id_vacuna`, `fk_id_mascota`, `fecha_vacuna`, `enfermedad`, `estado`, `fk_id_usuario`) VALUES
(1, 2, '2024-07-01', 'Rabia', 'Completa', NULL),
(2, 3, '2024-07-01', 'Rabia', 'Completa', NULL),
(3, 4, '2024-07-01', 'Rabia', 'Completa', NULL),
(4, 5, '2024-07-01', 'Rabia', 'Completa', NULL),
(5, 6, '2024-07-01', 'Rabia', 'Completa', NULL),
(6, 7, '2024-07-01', 'Rabia', 'Completa', NULL),
(7, 8, '2024-07-01', 'Rabia', 'Completa', NULL),
(8, 9, '2024-07-01', 'Rabia', 'Completa', NULL),
(9, 10, '2024-07-01', 'Rabia', 'Completa', NULL),
(10, 11, '2024-07-01', 'Rabia', 'Completa', NULL),
(11, 12, '2024-07-01', 'Rabia', 'Completa', NULL),
(12, 13, '2024-07-01', 'Rabia', 'Completa', NULL),
(13, 14, '2024-07-01', 'Rabia', 'Completa', NULL),
(14, 1, '2024-07-01', 'Rabia', 'Completa', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  ADD PRIMARY KEY (`id_mascota`),
  ADD KEY `fk_id_usuario` (`fk_id_usuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- Indices de la tabla `vacunas`
--
ALTER TABLE `vacunas`
  ADD PRIMARY KEY (`id_vacuna`),
  ADD KEY `fk_id_mascota` (`fk_id_mascota`),
  ADD KEY `fk_id_usuario` (`fk_id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  MODIFY `id_mascota` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `vacunas`
--
ALTER TABLE `vacunas`
  MODIFY `id_vacuna` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `mascotas`
--
ALTER TABLE `mascotas`
  ADD CONSTRAINT `mascotas_ibfk_1` FOREIGN KEY (`fk_id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `vacunas`
--
ALTER TABLE `vacunas`
  ADD CONSTRAINT `vacunas_ibfk_1` FOREIGN KEY (`fk_id_mascota`) REFERENCES `mascotas` (`id_mascota`),
  ADD CONSTRAINT `vacunas_ibfk_2` FOREIGN KEY (`fk_id_usuario`) REFERENCES `usuarios` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
