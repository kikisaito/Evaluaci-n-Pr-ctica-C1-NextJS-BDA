# ☕ Cafetería Dashboard - Evaluación Práctica C1

![Status](https://img.shields.io/badge/Status-Terminado-success) 
![Docker](https://img.shields.io/badge/Docker-Enabled-blue) 
![Next.js](https://img.shields.io/badge/Next.js-14-black)

Este proyecto es una aplicación web full-stack desarrollada con **Next.js** y **PostgreSQL**, orquestada mediante **Docker**. Está diseñada para funcionar en cualquier entorno que soporte Docker, sin necesidad de instalar Node.js o PostgreSQL localmente.

---

## 🛠️ Requisitos Previos

Para ejecutar este proyecto en cualquier sistema operativo (Windows, Mac, Linux), solo necesitas:

* 🐳 **Docker Desktop** (o Docker Engine + Docker Compose)
* 🐙 **Git** (opcional, para clonar el repositorio)

---

## 🚀 Guía de Inicio Rápido (Universal)

Sigue estos pasos para levantar el proyecto en minutos.

### 1. Clonar el repositorio
Si tienes Git instalado:
```bash
git clone https://github.com/kikisaito/Evaluaci-n-Pr-ctica-C1-NextJS-BDA.git
cd "Evaluaci-n-Pr-ctica-C1-NextJS-BDA"
```
*O descarga el código como ZIP y descomprímelo.*

### 2. Configurar Variables de Entorno
El proyecto necesita un archivo `.env` para funcionar. 

1. Crea un archivo llamado `.env` en la raíz del proyecto (al mismo nivel que `docker-compose.yml`).
2. Copia y pega el siguiente contenido (configuración por defecto lista para Docker):

```env
# Configuración de Base de Datos
DB_USER=postgres
DB_PASSWORD=kiki123uwuA
DB_NAME=postgres
DB_HOST=db

# URLs de Conexión
DATABASE_URL="postgresql://postgres:kiki123uwuA@db:5432/postgres"
NEXT_PUBLIC_API_URL="http://localhost:4000"
```

### 3. Ejecutar con Docker 🐳
Desde la terminal en la carpeta del proyecto, ejecuta:

```bash
docker-compose up --build
```
*(Nota: En algunas versiones nuevas de Docker, el comando es `docker compose up --build` sin el guion).*

---

## 💻 Acceso al Sistema

Una vez que veas los mensajes de éxito en la consola, accede a los servicios:

| Servicio | URL | Descripción |
|----------|-----|-------------|
| **Dashboard (Frontend)** | [http://localhost:3005](http://localhost:3005) | Interfaz web principal |
| **API Backend** | [http://localhost:4000](http://localhost:4000) | Servicio de datos |
| **Base de Datos** | `localhost:5432` | PostgreSQL (Usuario: postgres, Pass: kiki123uwuA) |

---

## 📊 Características del Proyecto

* **Frontend**: Next.js 14 con App Router y Tailwind CSS.
* **Backend**: Node.js/Express con TypeScript.
* **Base de Datos**: PostgreSQL 15 con scripts de inicialización automática (Seeds).
* **Infraestructura**: Docker Compose para orquestar todo el entorno.

---

## ❓ Solución de Problemas

### 🔴 "Variable is not set" o errores de conexión
Asegúrate de haber creado el archivo `.env` **exactamente** como se indica en el paso 2. Docker no leerá el archivo si se llama `.env.txt` o `env`.

### 🔴 Datos antiguos o error de inicialización
Si necesitas reiniciar la base de datos desde cero (borrar todos los datos y volver a crear las tablas):

```bash
docker-compose down -v
docker-compose up --build
```
*El flag `-v` elimina los volúmenes persistentes de la base de datos.*

---

**Desarrollado como parte de la Evaluación Práctica C1** 