# Cafetería Backend API

Backend separado para el dashboard de cafetería. Construido con Express + TypeScript + PostgreSQL.

## 🚀 Instalación

```bash
cd backend
npm install
```

## ⚙️ Configuración

1. Copia el archivo de ejemplo:
```bash
cp .env.example .env
```

2. Edita `.env` con tus credenciales de base de datos:
```env
DATABASE_URL=postgresql://usuario:password@localhost:5432/nombre_db
PORT=4000
```

## 🏃 Ejecución

### Modo desarrollo
```bash
npm run dev
```

### Modo producción
```bash
npm run build
npm start
```

El servidor estará disponible en `http://localhost:4000`

## 📡 Endpoints disponibles

- `GET /health` - Health check
- `GET /api/reports/sales` - Reporte de ventas diarias
- `GET /api/reports/customers?page=1` - Reporte de clientes (paginado)
- `GET /api/reports/payments` - Mezcla de métodos de pago
- `GET /api/reports/inventory` - Riesgo de inventario
- `GET /api/reports/ranking?search=&page=1` - Ranking de productos (con búsqueda y paginación)

## 🗄️ Base de Datos

Este backend requiere las siguientes vistas en PostgreSQL:
- `vw_sales_daily`
- `vw_customer_value`
- `vw_payment_mix`
- `vw_inventory_risk`
- `vw_top_products_ranked`
