# 🏗️ Arquitectura del Proyecto - Cafetería Dashboard (Separado)

## 📊 Diagrama de Arquitectura Actualizado

```
┌─────────────────────────────────────────────────────────────────┐
│                         NAVEGADOR (Cliente)                      │
│                      http://localhost:3000 (o 3001)             │
│                      (Renderiza UI de React)                    │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ 1. Petición HTTP (fetch) al Backend
                             │    GET http://localhost:4000/api/...
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│              BACKEND SEPARADO (Express + TypeScript)             │
│              Puerto: 4000                                        │
│              Ubicación: /backend                                 │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  rutas (src/routes/reports.ts)                           │   │
│  │  - /api/reports/sales                                    │   │
│  │  - /api/reports/customers                                │   │
│  │  - /api/reports/inventory                                │   │
│  │  - ...                                                   │   │
│  └──────────────────────────────────────────────────────────┘   │
│                             │                                    │
│                             │ 2. Consulta SQL (pool.query)       │
│                             ▼                                    │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              src/db.ts (PostgreSQL Pool)                 │   │
│  └──────────────────────────────────────────────────────────┘   │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ 3. Protocolo TCP (5432)
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                  BASE DE DATOS (PostgreSQL)                      │
│                      Puerto: 5432                                │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Vistas SQL (Views):                                     │   │
│  │    - vw_sales_daily                                      │   │
│  │    - vw_inventory_risk                                   │   │
│  │    ...                                                   │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## 📂 Estructura de Proyectos Separados

### 1. 🟢 FRONTEND (Next.js) - `Puerto 3001 (o 3000)`
**Ubicación:** Raíz del proyecto `/`
- **Responsabilidad:** Solo Interfaz de Usuario (UI).
- **Tecnología:** Next.js (React), TailwindCSS.
- **Componentes:** Son "Client Components" (`'use client'`).
- **Datos:** No tiene acceso directo a la BD. Obtiene datos vía `fetch()` al puerto 4000.
- **Archivos Clave:**
  - `app/reports/*/page.tsx`: Páginas que consumen la API.
  - `.env.local`: Define `NEXT_PUBLIC_API_URL=http://localhost:4000`.

### 2. 🔵 BACKEND (Express) - `Puerto 4000`
**Ubicación:** Carpeta `/backend`
- **Responsabilidad:** Lógica de negocio, API REST y conexión a BD.
- **Tecnología:** Node.js, Express, TypeScript, `pg` (Postgres client).
- **Datos:** Ejecuta queries SQL directas a PostgreSQL.
- **Archivos Clave:**
  - `src/index.ts`: Servidor Express y configuración CORS.
  - `src/routes/reports.ts`: Definición de endpoints.
  - `src/db.ts`: Configuración de conexión a BD.

### 3. 🟣 BASE DE DATOS (PostgreSQL) - `Puerto 5432`
**Ubicación:** Contenedor Docker `cafeteria_db_cont`
- **Responsabilidad:** Almacenamiento y vistas SQL.

---

## 🔄 Flujo de Datos Completo

1. **Usuario** entra a "Reporte de Ventas" en el navegador.
2. **Frontend** (`app/reports/sales/page.tsx`):
   - Es un componente de cliente (`'use client'`).
   - Usa `useEffect` para llamar a la API externa.
   - Ejecuta: `fetch('http://localhost:4000/api/reports/sales')`.
3. **Backend** (`backend/src/routes/reports.ts`):
   - Recibe la petición en el puerto 4000.
   - Conecta a la BD y ejecuta `SELECT * FROM vw_sales_daily`.
4. **Base de Datos**:
   - Retorna las filas.
5. **Backend**:
   - Envía JSON al frontend: `{ success: true, data: [...] }`.
6. **Frontend**:
   - Recibe el JSON y actualiza el estado (`setRows`).
   - React renderiza la tabla.

---

## 🐳 Docker Compose Actualizado

Servicios definidos en `docker-compose.yml`:

1. **db**: Imagen `postgres:15-alpine`.
2. **backend**: Construido desde `./backend`. Expone puerto 4000.
3. **app** (Frontend): Construido desde raíz `.`. Expone puerto 3000 (mapeado a 3005 externamente si se usa Docker puro).

---

## ✅ ¿Por qué hay código en `.tsx`?

Es importante distinguir entre **Backend** y **Fetching de Datos en Cliente**:

- **Backend (Lado Servidor)**: Código que corre en el servidor, conecta a base de datos, tiene secretos/passwords. **Esto está 100% en la carpeta `/backend`**.
- **Fetching (Lado Cliente)**: Código que corre en el navegador del usuario para pedir datos. El uso de `fetch`, `useEffect`, `useState` en los archivos `.tsx` es **código de Frontend**, necesario para comunicarse con el servidor separado. No es backend.
