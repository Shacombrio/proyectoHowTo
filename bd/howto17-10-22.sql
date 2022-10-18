-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-10-2022 a las 04:30:37
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `howto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `idCategoria` int(10) NOT NULL,
  `nombreCategoria` varchar(100) NOT NULL,
  `Estatus` int(2) NOT NULL,
  `Icono` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`idCategoria`, `nombreCategoria`, `Estatus`, `Icono`) VALUES
(1, 'heladres', 1, 'imagen.jpg'),
(5, 'Comida', 1, 'iamgen22.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chat`
--

CREATE TABLE `chat` (
  `idChat` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `fechaYhora` datetime NOT NULL,
  `Mensaje` varchar(1000) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `chat`
--

INSERT INTO `chat` (`idChat`, `idUsuario`, `fechaYhora`, `Mensaje`) VALUES
(1, 2, '2022-10-16 20:02:34', 'hola');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favoritos`
--

CREATE TABLE `favoritos` (
  `idUsuario` int(3) NOT NULL,
  `idPost` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mediaposts`
--

CREATE TABLE `mediaposts` (
  `idMedia` int(10) NOT NULL,
  `idPost` int(10) NOT NULL,
  `Estatus` int(10) NOT NULL,
  `link` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `posts`
--

CREATE TABLE `posts` (
  `idPosts` int(11) NOT NULL,
  `Titulo` varchar(200) NOT NULL,
  `textoPost` varchar(3000) NOT NULL,
  `idUsuario` int(10) NOT NULL,
  `idCategoria` int(10) NOT NULL,
  `likes` int(10) NOT NULL,
  `dislikes` int(10) NOT NULL,
  `Estatus` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `posts`
--

INSERT INTO `posts` (`idPosts`, `Titulo`, `textoPost`, `idUsuario`, `idCategoria`, `likes`, `dislikes`, `Estatus`) VALUES
(4, 'Tareas herman', 'Veremos las tareas de herman', 2, 5, 3, 3, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipousuario`
--

CREATE TABLE `tipousuario` (
  `idTipo` int(10) NOT NULL,
  `nombreTipo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipousuario`
--

INSERT INTO `tipousuario` (`idTipo`, `nombreTipo`) VALUES
(1, 'Admin'),
(2, 'Usuario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL,
  `Correo` varchar(50) NOT NULL,
  `nombreUsuario` varchar(50) NOT NULL,
  `Contraseña` varchar(255) NOT NULL,
  `Estatus` int(2) NOT NULL,
  `Imagen` varchar(200) NOT NULL,
  `tipoUsuario` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `Correo`, `nombreUsuario`, `Contraseña`, `Estatus`, `Imagen`, `tipoUsuario`) VALUES
(2, 'sombrio@correo.com', 'Sombrio', 'b6dd4d3e1e921747d48ce1be2d34d890461aaf04586e0adf1dd76e482ada73480ae556547904dd03073d48849b73d477f1c5552bd77d8a81b2371a5d53845e0d', 1, 'img.jpg', 2),
(3, 'Axel@correo.com', 'Axelito', '941c209cdd93ee6876bc2c40c51ad9dd21f38d85dc6a48add441ec25a3ae2ec5631f184823472c65b860ef23376b5c35bed47c2180581fbe1dd99ad423eede55', 1, 'imagen.jpg', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuariostoken`
--

CREATE TABLE `usuariostoken` (
  `id_usuario` int(11) NOT NULL,
  `token` varchar(1000) NOT NULL,
  `fecha_reaccion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `estatus` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuariostoken`
--

INSERT INTO `usuariostoken` (`id_usuario`, `token`, `fecha_reaccion`, `estatus`) VALUES
(3, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtZXNzYWdlIjoiXHUwMGExT3BlcmFjaW9uIGNvbiBFeGl0byEiLCJzdGF0dXMiOjIwMCwiZGF0YSI6eyJpZFVzdWFyaW8iOjMsIkNvcnJlbyI6IkF4ZWxAY29ycmVvLmNvbSIsIm5vbWJyZVVzdWFyaW8iOiJBeGVsaXRvIiwiRXN0YXR1cyI6MSwiSW1hZ2VuIjoiaW1hZ2VuLmpwZyIsInRpcG9Vc3VhcmlvIjoxfX0.F3SEOXrUR0yMtxSWOcxQ7mBb1iD4n5D7sM07twEcn1Y', '2022-10-18 02:29:47', 0),
(2, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtZXNzYWdlIjoiXHUwMGExT3BlcmFjaW9uIGNvbiBFeGl0byEiLCJzdGF0dXMiOjIwMCwiZGF0YSI6eyJpZFVzdWFyaW8iOjIsIkNvcnJlbyI6InNvbWJyaW9AY29ycmVvLmNvbSIsIm5vbWJyZVVzdWFyaW8iOiJTb21icmlvIiwiRXN0YXR1cyI6MSwiSW1hZ2VuIjoiaW1nLmpwZyIsInRpcG9Vc3VhcmlvIjoyfX0.NbvNGrZyJAvwGti0TTPU5HUV1uqXYCq9n1PRv_NbsJw', '2022-10-18 02:26:40', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`idCategoria`);

--
-- Indices de la tabla `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`idChat`);

--
-- Indices de la tabla `favoritos`
--
ALTER TABLE `favoritos`
  ADD PRIMARY KEY (`idUsuario`,`idPost`),
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `idPost` (`idPost`);

--
-- Indices de la tabla `mediaposts`
--
ALTER TABLE `mediaposts`
  ADD PRIMARY KEY (`idMedia`),
  ADD KEY `idPost` (`idPost`);

--
-- Indices de la tabla `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`idPosts`),
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `idCategoria` (`idCategoria`);

--
-- Indices de la tabla `tipousuario`
--
ALTER TABLE `tipousuario`
  ADD PRIMARY KEY (`idTipo`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`),
  ADD KEY `tipoUsusario` (`tipoUsuario`);

--
-- Indices de la tabla `usuariostoken`
--
ALTER TABLE `usuariostoken`
  ADD KEY `fktokenusu` (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `idCategoria` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `posts`
--
ALTER TABLE `posts`
  MODIFY `idPosts` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tipousuario`
--
ALTER TABLE `tipousuario`
  MODIFY `idTipo` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `favoritos`
--
ALTER TABLE `favoritos`
  ADD CONSTRAINT `favoritos_ibfk_1` FOREIGN KEY (`idPost`) REFERENCES `posts` (`idPosts`) ON UPDATE CASCADE,
  ADD CONSTRAINT `favoritos_ibfk_2` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `mediaposts`
--
ALTER TABLE `mediaposts`
  ADD CONSTRAINT `mediaposts_ibfk_1` FOREIGN KEY (`idPost`) REFERENCES `posts` (`idPosts`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`idCategoria`) REFERENCES `categorias` (`idCategoria`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`tipoUsuario`) REFERENCES `tipousuario` (`idTipo`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuariostoken`
--
ALTER TABLE `usuariostoken`
  ADD CONSTRAINT `fktokenusu` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`idUsuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
