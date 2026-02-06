import { Pool } from 'pg';

// El 'export' es lo que lo convierte en un módulo
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});