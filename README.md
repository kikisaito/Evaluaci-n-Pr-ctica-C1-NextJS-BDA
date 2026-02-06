# ☕ Cafetería Dashboard - Evaluación Práctica C1

![Status](https://img.shields.io/badge/Status-Terminado-success) 
![Docker](https://img.shields.io/badge/Docker-Enabled-blue) 
![Next.js](https://img.shields.io/badge/Next.js-14-black)

Este proyecto es una aplicación web desarrollada con **Next.js** y **PostgreSQL**, orquestada mediante **Docker**. Está diseñada para gestionar y visualizar reportes estratégicos de una cafetería de manera eficiente.

---

## 🛠️ Requisitos Previos

Para ejecutar este proyecto sin errores, asegúrate de tener instalado:
* 🐳 **Docker Desktop** (con Docker Compose habilitado).
* 🌐 Un navegador web actualizado.

---

## 🚀 Configuración e Instalación

Sigue estos pasos para levantar el entorno de desarrollo desde cero.

### 1. Variables de Entorno (Seguridad 🔒)

> [!IMPORTANT]
> Siguiendo las buenas prácticas de seguridad, las credenciales de la base de datos **no** están expuestas en el repositorio.

1. Localiza el archivo `.env.example` en la raíz del proyecto.
2. Crea una copia y renómbrala a `.env`.
3. Configura tus credenciales. Para que funcione correctamente con Docker, el contenido debe ser:

```env
DB_USER=postgres
DB_PASSWORD=tu_contraseña_aqui
DB_NAME=postgres
DB_HOST=db
DATABASE_URL="postgresql://postgres:tu_contraseña_aqui@db:5432/postgres"


2. Despliegue con Docker 🐳
Abre una terminal en la carpeta del proyecto y ejecuta:

docker compose up --build


💻 Acceso al Sistema
Una vez que la terminal indique que el servidor está listo (✓ Ready), puedes acceder a:


Servicio	       Dirección	                      Descripción
Dashboard Web	http://localhost:3001	    Interfaz de usuario principal.
Base de Datos	localhost:5432	            Conexión directa a PostgreSQL.


¿Por qué el puerto 3001? Se configuró externamente para evitar conflictos con otros servicios de Next.js que suelen ocupar el puerto 3000 por defecto.



📊 Reportes Disponibles
El dashboard incluye visualizaciones dinámicas basadas en Vistas SQL (VIEWS) para:

📈 Ventas generales: Vista de ingresos y transacciones.

🏆 Ranking de productos: Identificación de los artículos más vendidos.

📦 Inventario: Estado actual del stock.

💳 Clientes: Historial de pagos y fidelización.

❓ Solución de Problemas Comunes
🔴 Error de conexión a BD
Causa: La aplicación busca la base de datos en localhost en lugar del contenedor.

Solución: Asegúrate de que en tu archivo .env, el DB_HOST sea db (el nombre del servicio en Docker).

🔴 Datos no visibles o Error de Contraseña Inicial
Causa: Si configuraste mal la contraseña la primera vez y luego la corregiste, Docker mantiene el volumen "corrupto" con la configuración anterior.

Solución: Debes limpiar los volúmenes para que la automatización corra desde cero:

# Detiene los contenedores y borra los datos previos
docker compose down -v

# Levanta todo de nuevo con la configuración corregida
docker compose up --build