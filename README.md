 Cafetería Dashboard - Evaluación Práctica C1
Este proyecto es una aplicación web desarrollada con Next.js y PostgreSQL montada sobre Docker, diseñada para gestionar y visualizar reportes de una cafetería.

Requisitos Previos
Para ejecutar este proyecto, asegúrate de tener instalado:

Docker Desktop (con Docker Compose habilitado).

Un navegador web actualizado.

 Configuración e Instalación
Sigue estos pasos para levantar el entorno desde cero:

1. Variables de Entorno (Seguridad)
Por motivos de seguridad y siguiendo las buenas prácticas, las credenciales de la base de datos no están incluidas en el repositorio.

Localiza el archivo llamado .env.example.

Crea una copia de este archivo y renómbralo a .env.

Asegúrate de que el contenido del archivo .env coincida con las credenciales de tu preferencia, por ejemplo:

Fragmento de código
DB_USER=postgres
DB_PASSWORD=tu_contraseña_aqui
DB_NAME=postgres
DB_HOST=db
DATABASE_URL="postgresql://postgres:tu_contraseña_aqui@db:5432/postgres"
2. Despliegue con Docker
Abre una terminal en la carpeta del proyecto y ejecuta:

PowerShell
docker compose up --build
Nota: El sistema inicializará automáticamente la base de datos, creará las tablas, las vistas de reportes y cargará datos de prueba (seeding).

 Acceso al Sistema
Una vez que la terminal indique que el servidor está listo (✓ Ready), podrás acceder mediante:

URL: http://localhost:3001

Puerto de la App: 3001 (Configurado para evitar conflictos con servicios locales en el puerto 3000).

Puerto de la BD: 5432.

 Reportes Disponibles
El dashboard incluye visualizaciones automáticas basadas en vistas de SQL para:

Ventas generales (sales).

Ranking de productos.

Estado del inventario.

Pagos y Clientes.

 Solución de Problemas Comunes
Error de conexión a BD: Asegúrate de que el nombre del host en el .env sea db y no localhost.

Puerto 3000 ocupado: Este proyecto utiliza el puerto 3001 de forma externa para evitar este conflicto común en entornos de desarrollo.

Datos no visibles: El script de inicialización (seed.sql) se ejecuta solo la primera vez que se crea el volumen. Si cambias la contraseña, usa docker compose down -v y levanta de nuevo para resetearlo.