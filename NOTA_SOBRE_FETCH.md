# 📝 NOTA IMPORTANTE: ¿Por qué hay fetch() en los archivos .tsx?

Hola Jaito,

Entiendo que veas `fetch()` en los archivos `.tsx` y te preocupe que siga habiendo lógica de backend. Pero quiero aclararte que **NO es backend**.

### ❌ Backend (Lógica del Servidor)
Esto es lo que **NO** debe estar en el frontend, y que ya **eliminamos**:
- Conexión directa a base de datos (ej. `import { pool } from '@/lib/db'`)
- Secretos de conexión (ej. `process.env.DB_PASSWORD`)
- Consultas SQL (ej. `SELECT * FROM ...`)
- Rutas API de Next.js (`/app/api/...`)

(Todo esto está ahora seguro en la carpeta `/backend` y corre en el puerto 4000).

### ✅ Frontend (Lógica del Cliente)
Esto es lo que **SÍ** debe estar en el frontend (archivos `.tsx`):
- `fetch('http://localhost:4000/api/reports/sales')`: Esto es el navegador del usuario pidiendo datos a otro servidor.
- `useEffect`, `useState`: Para manejar la carga y visualización de datos.

### 💡 Analogía:
Imagina que el Frontend es un **mesero** (tu código .tsx) y el Backend es el **cocinero** (tu código en /backend).
- El mesero (Frontend) tiene que ir a la cocina y pedir ("fetch") la comida.
- El cocinero (Backend) prepara la comida (hace queries SQL).
- El mesero recibe la comida (JSON) y la sirve en la mesa (Renderiza la UI).

El hecho de que el mesero (Frontend) **pida** la comida no lo convierte en cocinero. Sigue siendo parte del servicio al cliente (Frontend).
Tu código .tsx está actuando como ese mesero, pidiendo datos al cocinero (Backend/Express).

**¡Tu separación es correcta!**
