-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-07-2024 a las 03:07:45
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
-- Estructura de tabla para la tabla `adopciones`
--

CREATE TABLE `adopciones` (
  `id_adopcion` int(11) NOT NULL,
  `fk_id_mascota` int(11) NOT NULL,
  `fk_id_usuario_adoptante` int(11) NOT NULL,
  `fecha_adopcion` date DEFAULT NULL,
  `estado` enum('aceptada','rechazada') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(2, 'manchas', 'Hembra', 'Rexq', 5, 'img-1721571784753-418476505.JPG', 'Mascota amigable y enérgicaqwe...', 'adoptada', 4, '', NULL),
(3, 'lulu', 'Hembra', 'Bulldog', 1, 'img-1721695096065-78416463.jpg', 'Mascota amigable y enérgica...', 'adoptada', 4, '', NULL),
(4, 'manchas', 'Hembra', 'Rex', 1, 'img-1721695111472-773592146.png', 'manchas es una amscota muy amigable, es muy inteligente y hace todo por comer jsjsjs es mediana, es vacunada y para ams informacion comunitate!', 'adoptar', 4, 'undefined', NULL),
(9, 'qwe', 'Macho', 'Bulldog', 11, NULL, 'qwe', 'adoptar', 1, '', NULL),
(10, 'qwe', 'Macho', 'qwe', 1, 'img-1721695142064-748228068.png', 'qwe', 'adoptar', 1, '', NULL),
(17, 'estrella', 'Hembra', 'Bulldog', 3, NULL, 'Mascota amigable y enérgica.', 'adoptar', 1, '', NULL),
(18, 'estrella', 'Hembra', 'Bulldog', 3, NULL, 'Mascota amigable y enérgica.', 'adoptar', 1, '', NULL),
(19, 'd', 'Macho', 'd', 1, 'img-1721743625616-120854370.png', 'af rwe gth rhrgt', 'adoptar', 1, '', NULL),
(20, 'netflix', 'Macho', 'netflix', 2, 'img-1721743650205-844876723.png', 'netflix', 'adoptar', 1, '', NULL),
(21, 'estrella', 'Hembra', 'Bulldog', 3, NULL, 'Mascota amigable y enérgica.', 'adoptar', 1, '', NULL),
(22, 'estrella', 'Hembra', 'Bulldog', 3, NULL, 'Mascota amigable y enérgica.', 'adoptar', 1, '', NULL),
(23, 'manchas', 'Hembra', 'Rex', 5, NULL, 'Mascota amigable y enérgicaqwe...', 'adoptar', 1, 'lorop', NULL),
(24, 'qwe', 'Macho', 'qwe', 2, 'img-1722129351772-139415307.jpeg', 'qwe', 'adoptar', 1, 'Gato', NULL),
(25, 'bella', 'Hembra', 'Rex', 2, 'img-1722129378241-858905539.png', 'es una oveja muy hermosa de buen cudiado, tamaño medio y le gusta el campo abierto es divertida y no causa problemas', 'adoptar', 1, 'Oveja', NULL),
(26, 'qwe', 'Macho', 'qwe', 2, 'img-1722129450252-912793764.jpg', 'wqer', 'adoptar', 1, 'Perro', NULL),
(27, 'estrella', 'Hembra', 'Bulldog', 3, NULL, 'Mascota amigable y enérgica.', 'adoptar', 1, 'loro', NULL),
(28, 'estrella', 'Hembra', 'Bulldog', 3, 'img-1722174684210-571254470.png', 'Mascota amigable y enérgica.', 'adoptar', 1, 'loro', NULL),
(29, 'estrella', 'Hembra', 'Bulldog', 3, 'img-1722174796149-647715306.png', 'Mascota amigable y enérgica.', 'adoptar', 1, 'loro', 'no se'),
(30, 'estrella', 'Hembra', 'Bulldog', 3, 'img-1722174929063-943167705.png', 'Mascota amigable y enérgica.', 'adoptar', 1, 'loro', 'si'),
(31, 'estrella', 'Hembra', 'Bulldog', 3, 'img-1722175887786-540337709.png', 'Mascota amigable y enérgica.', 'adoptar', 1, 'loro', 'si'),
(32, 'qe', 'Macho', 'qw', 2, 'img-1722176263628-442030665.jpeg', 'qeqwdc svs', 'adoptar', 1, 'Perro', 'no'),
(33, 'negro', 'Macho', 'Rex', 2, 'img-1722176318577-34026561.jpg', 'es un caballo hermoso negro, es pacifico y le gusta estar en el campo libre, es feliz y alegre, adopta!', 'adoptar', 1, 'Caballo', 'si');

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
(4, 108423200, 'Miguel AA', 'Perez Vargas', 'miguel@gmail.com', '123456789', '12345', 'usuario'),
(7, 108423200, 'Pepito A', 'Perez Vargas', 'pepito@gmail.com', '1234567890', '1234', 'usuario'),
(10, 12345, 'alejo p', 'pasaje', 'pasaje@gmail.com', '123456789', '123456', 'usuario'),
(11, 0, '', '', '@', '', '', 'usuario');

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
(2, 2, '2022-12-22', 'Enfermdad contra el moquillo dos', 'Completa', 4),
(3, 2, '2021-07-24', 'Enfermdad contra el moquillo', 'Completa', 4),
(4, 2, '2021-07-24', 'Enfermdad contra el moquillo', 'Completa', 4),
(5, 2, '2024-07-21', 'Enfermdad contra el moquillo', 'Completa', 4),
(7, 2, '2024-07-22', 'Enfermdad contra el moquillo', 'Completa', NULL),
(9, 2, '2024-07-22', 'Enfermdad contra el moquillo', 'Completa', NULL),
(10, 2, '2024-07-22', 'Enfermdad contra el moquillo', 'Completa', NULL),
(12, 3, '2024-07-07', 'qwe', 'Completa', NULL),
(14, 3, '2024-07-07', 'qwe', 'Completa', NULL),
(15, 2, '2024-07-03', 'moquillo', 'Completa', NULL),
(16, 2, '2024-07-04', 'moquillo', 'En proceso', NULL),
(17, 2, '2024-07-11', 'moquillodos', 'En proceso', NULL),
(18, 33, '2024-07-12', 'qwe', 'Completa', NULL),
(19, 33, '2024-07-07', 'loco', 'Completa', NULL),
(20, 33, '2024-07-17', 'rabia ', 'Completa', NULL),
(21, 33, '2024-07-25', 'cancer', 'Completa', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `adopciones`
--
ALTER TABLE `adopciones`
  ADD PRIMARY KEY (`id_adopcion`),
  ADD KEY `fk_id_mascota` (`fk_id_mascota`),
  ADD KEY `fk_id_usuario_adoptante` (`fk_id_usuario_adoptante`);

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
-- AUTO_INCREMENT de la tabla `adopciones`
--
ALTER TABLE `adopciones`
  MODIFY `id_adopcion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  MODIFY `id_mascota` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `vacunas`
--
ALTER TABLE `vacunas`
  MODIFY `id_vacuna` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `adopciones`
--
ALTER TABLE `adopciones`
  ADD CONSTRAINT `adopciones_ibfk_1` FOREIGN KEY (`fk_id_mascota`) REFERENCES `mascotas` (`id_mascota`),
  ADD CONSTRAINT `adopciones_ibfk_2` FOREIGN KEY (`fk_id_usuario_adoptante`) REFERENCES `usuarios` (`id_usuario`);

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
