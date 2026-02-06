# ☕ Cafetería Dashboard - Evaluación Práctica C1

![Status](https://img.shields.io/badge/Status-Terminado-success) 
![Docker](https://img.shields.io/badge/Docker-Enabled-blue) 
![Next.js](https://img.shields.io/badge/Next.js-14-black)

Este proyecto es una aplicación web desarrollada con **Next.js** y **PostgreSQL**, orquestada mediante **Docker**, diseñada para gestionar y visualizar reportes estratégicos de una cafetería.

---

## 🛠️ Requisitos Previos

Para ejecutar este proyecto sin errores, asegúrate de tener instalado:

* 🐳 **Docker Desktop** (con Docker Compose habilitado)
* 🌐 Un navegador web actualizado (Chrome, Edge, Firefox, etc.)

---

## 🚀 Configuración e Instalación

Sigue estos pasos para levantar el entorno de desarrollo desde cero.

### 1. Variables de Entorno (Seguridad 🔒)

> **Nota Importante:** Siguiendo las buenas prácticas de seguridad y desarrollo, las credenciales de la base de datos **no** están expuestas en el repositorio.

1. Localiza el archivo llamado `.env.example` en la raíz del proyecto
2. Crea una copia de este archivo y renómbralo a `.env`
3. Configura tus credenciales. El contenido debe verse así para funcionar correctamente con Docker:
```env
DB_USER=postgres
DB_PASSWORD=tu_contraseña_aqui
DB_NAME=postgres
DB_HOST=db
DATABASE_URL="postgresql://postgres:tu_contraseña_aqui@db:5432/postgres"
```

### 2. Despliegue con Docker 🐳

Abre una terminal en la carpeta del proyecto y ejecuta el siguiente comando:
```bash
docker compose up --build
```

✅ **Nota:** El sistema inicializará automáticamente la base de datos, creará las tablas, las vistas de reportes y cargará datos de prueba (seeding) automáticamente la primera vez que se ejecute.

---

## 💻 Acceso al Sistema

Una vez que la terminal indique que el servidor está listo (✓ Ready), podrás acceder a la aplicación:

| Servicio | Dirección | Descripción |
|----------|-----------|-------------|
| **Dashboard Web** | http://localhost:3000 | Interfaz de usuario principal |
| **Base de Datos** | localhost:5432 | Conexión directa a PostgreSQL |

> **¿Por qué el puerto 3001?** Se ha configurado externamente en el puerto 3001 para evitar conflictos con otros servicios locales que suelen ocupar el puerto 3000 por defecto.

---

## 📊 Reportes Disponibles

El dashboard incluye visualizaciones dinámicas basadas en Vistas SQL (VIEWS) para:

* 📈 **Ventas generales** (Vista `sales`)
* 🏆 **Ranking de productos más vendidos**
* 📦 **Estado del inventario actual**
* 💳 **Historial de Pagos y Clientes**

---

## ❓ Solución de Problemas Comunes

### 🔴 Error de conexión a BD

**Causa:** La aplicación busca la base de datos en una dirección incorrecta.

**Solución:** Asegúrate de que en tu archivo `.env`, el `DB_HOST` sea `db` (el nombre del servicio en Docker) y **NO** `localhost`.

### 🔴 Datos no visibles o error de autenticación inicial

**Causa:** Si hubo un error en la contraseña la primera vez, el volumen de Docker queda guardado con el error.

**Solución:** Reinicia el volumen para forzar una nueva carga de datos limpia:
```bash
docker compose down -v
docker compose up --build
```

---

## 📝 Notas Adicionales

* El proyecto utiliza contenedores para garantizar un entorno reproducible
* Los datos de prueba se cargan automáticamente en el primer arranque
* Las vistas SQL optimizan las consultas de reportes

---

**Desarrollado como parte de la Evaluación Práctica C1** 