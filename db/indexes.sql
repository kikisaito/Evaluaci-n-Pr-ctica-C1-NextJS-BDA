-- 1. Índice para mejorar la velocidad de búsqueda por nombre de producto [cite: 23, 35]
CREATE INDEX idx_products_name ON products(name);

-- 2. Índice para optimizar los filtros por fecha en las ventas diarias [cite: 18, 33]
CREATE INDEX idx_orders_created_at ON orders(created_at);

-- 3. Índice para acelerar los JOINs entre pedidos y clientes [cite: 13, 30]
CREATE INDEX idx_orders_customer_id ON orders(customer_id);

-- aqui aprendi usar indices jaja, hola profe si ve este comentario, y hracias por la guia de docker