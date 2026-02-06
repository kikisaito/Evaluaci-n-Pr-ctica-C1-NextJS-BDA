
CREATE OR REPLACE VIEW vw_sales_daily AS
SELECT 
    DATE(o.created_at) AS fecha,
    COUNT(o.id) AS total_tickets,
    SUM(p.paid_amount) AS total_ventas,
    ROUND(AVG(p.paid_amount), 2) AS ticket_promedio
FROM orders o
JOIN payments p ON o.id = p.order_id
GROUP BY DATE(o.created_at);


CREATE OR REPLACE VIEW vw_top_products_ranked AS
SELECT 
    p.name AS producto,
    SUM(oi.qty) AS unidades_vendidas,
    SUM(oi.qty * oi.unit_price) AS ingresos_totales,
    RANK() OVER (ORDER BY SUM(oi.qty * oi.unit_price) DESC) AS ranking
FROM order_items oi
JOIN products p ON oi.product_id = p.id
GROUP BY p.id, p.name;


CREATE OR REPLACE VIEW vw_inventory_risk AS
SELECT 
    p.name AS producto,
    p.stock,
    CASE 
        WHEN p.stock = 0 THEN 'Agotado'
        WHEN p.stock < 10 THEN 'Riesgo Crítico'
        WHEN p.stock < 20 THEN 'Riesgo Bajo'
        ELSE 'Saludable'
    END AS nivel_alerta,
    ROUND((p.stock * 100.0 / 100), 2) AS porcentaje_disponible 
FROM products p
WHERE p.stock < 20;

CREATE OR REPLACE VIEW vw_customer_value AS
SELECT 
    c.name AS cliente,
    COUNT(o.id) AS num_ordenes,
    SUM(p.paid_amount) AS total_gastado,
    ROUND(AVG(p.paid_amount), 2) AS gasto_promedio
FROM customers c
JOIN orders o ON c.id = o.customer_id
JOIN payments p ON o.id = p.order_id
GROUP BY c.id, c.name
HAVING COUNT(o.id) >= 1; 

CREATE OR REPLACE VIEW vw_payment_mix AS
WITH total_recibido AS (
    SELECT SUM(paid_amount) as gran_total FROM payments
)
SELECT 
    p.method AS metodo_pago,
    COUNT(*) AS transacciones,
    SUM(p.paid_amount) AS monto_total,
    ROUND((SUM(p.paid_amount) * 100.0 / (SELECT gran_total FROM total_recibido)), 2) AS porcentaje
FROM payments p
GROUP BY p.method;