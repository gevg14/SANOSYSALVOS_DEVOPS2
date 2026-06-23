-- Creación de bases de datos independientes para garantizar el desacoplamiento estricto
CREATE DATABASE db_usuarios;
CREATE DATABASE db_mascotas;
CREATE DATABASE db_adopciones;
CREATE DATABASE db_donaciones;
CREATE DATABASE db_historial;

-- Mensaje de verificación en los logs del contenedor
\echo '¡Todas las bases de datos de Sanos y Salvos se han inicializado correctamente!';