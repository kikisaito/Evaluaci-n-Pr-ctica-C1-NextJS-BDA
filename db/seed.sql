-- si esto salio completamente de un promtt pero es solo para meter datos de prueba no hay problema :3
-- y que todas las vistas muestren algo



-- Limpiar datos anteriores para evitar duplicados (Orden inverso por las FK)
TRUNCATE TABLE payments, order_items, orders, products, customers, categories RESTART IDENTITY CASCADE;

-- 1. CATEGORÍAS
INSERT INTO categories (name) VALUES 
('Bebidas Calientes'), 
('Bebidas Frías'), 
('Repostería'), 
('Sandwiches');

-- 2. PRODUCTOS (Algunos en riesgo de stock para el reporte de Inventario)
INSERT INTO products (name, category_id, price, stock, active) VALUES
('Café Americano', 1, 40.00, 100, true),
('Cappuccino', 1, 55.00, 50, true),
('Frappé Moka', 2, 65.00, 80, true),
('Té Chai', 1, 45.00, 15, true),        -- Riesgo Bajo (<20)
('Panqué de Elote', 3, 35.00, 5, true),   -- Riesgo Crítico (<10)
('Croissant', 3, 30.00, 0, true),         -- Agotado (0)
('Bagel de Salmón', 4, 85.00, 25, true);

-- 3. CLIENTES
INSERT INTO customers (name, email) VALUES
('Jaitovich Jimenez', 'jaito@upchiapas.edu.mx'),
('Juan Pérez', 'juan@test.com'),
('Ana López', 'ana@test.com'),
('Carlos Ruiz', 'carlos@test.com');

-- 4. ÓRDENES (Fechas variadas para el reporte de Ventas Diarias)
INSERT INTO orders (customer_id, created_at, status, channel) VALUES
(1, NOW(), 'completed', 'mostrador'),         -- Orden de hoy
(1, NOW() - INTERVAL '1 day', 'completed', 'app'), -- Orden de ayer
(2, NOW() - INTERVAL '2 days', 'completed', 'mostrador'),
(3, NOW(), 'completed', 'mostrador'),
(1, NOW(), 'completed', 'mostrador'); -- Jaitovich compra de nuevo (Cliente Frecuente)

-- 5. DETALLES DE ÓRDENES (Aquí es donde el Ranking cobra vida)
-- Relacionamos las órdenes con los productos
INSERT INTO order_items (order_id, product_id, qty, unit_price) VALUES
(1, 1, 2, 40.00), -- 2 Cafés Americanos
(1, 5, 1, 35.00), -- 1 Panqué (¡Aquí se registra la venta del Panqué!)
(2, 3, 1, 65.00), -- 1 Frappé
(3, 2, 2, 55.00), -- 2 Cappuccinos
(4, 7, 1, 85.00), -- 1 Bagel
(5, 5, 3, 35.00); -- 3 Panqués más (Para que suba en el ranking)

-- 6. PAGOS (Para el reporte de Mezcla de Pagos)
INSERT INTO payments (order_id, method, paid_amount) VALUES
(1, 'efectivo', 115.00),
(2, 'tarjeta', 65.00),
(3, 'tarjeta', 110.00),
(4, 'efectivo', 85.00),
(5, 'transferencia', 105.00);