# ☕ Cafetería Dashboard - Evaluación Práctica C1

![Status](https://img.shields.io/badge/Status-Terminado-success) ![Docker](https://img.shields.io/badge/Docker-Enabled-blue) ![Next.js](https://img.shields.io/badge/Next.js-14-black)

Este proyecto es una aplicación web desarrollada con **Next.js** y **PostgreSQL** orquestada sobre **Docker**, diseñada para gestionar y visualizar reportes estratégicos de una cafetería.

---

## 🛠️ Requisitos Previos

Para ejecutar este proyecto sin errores, asegúrate de tener instalado:

* 🐳 **Docker Desktop** (con Docker Compose habilitado).
* 🌐 Un navegador web actualizado (Chrome, Edge, Firefox, etc.).

---

## 🚀 Configuración e Instalación

Sigue estos pasos para levantar el entorno de desarrollo desde cero.

### 1. Variables de Entorno (Seguridad 🔒)
> **Nota Importante:** Siguiendo las buenas prácticas de seguridad y desarrollo, las credenciales de la base de datos **no** están expuestas en el repositorio.

1.  Localiza el archivo llamado `.env.example` en la raíz del proyecto.
2.  Crea una copia de este archivo y renómbralo a `.env`.
3.  Configura tus credenciales. El contenido debe verse así:

```env
DB_USER=postgres
DB_PASSWORD=tu_contraseña_aqui
DB_NAME=postgres
DB_HOST=db
DATABASE_URL="postgresql://postgres:tu_contraseña_aqui@db:5432/postgres"