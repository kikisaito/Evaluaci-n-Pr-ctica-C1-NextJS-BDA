import { Router } from 'express';
import { pool } from '../db';

const router = Router();

// GET /api/reports/sales
router.get('/sales', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM vw_sales_daily');
        res.json({ success: true, data: rows });
    } catch (error) {
        console.error('Error fetching sales report:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch sales report' });
    }
});

// GET /api/reports/customers
router.get('/customers', async (req, res) => {
    try {
        const page = parseInt(req.query.page as string || '1');
        const limit = 5;
        const offset = (page - 1) * limit;

        const { rows } = await pool.query(
            'SELECT * FROM vw_customer_value LIMIT $1 OFFSET $2',
            [limit, offset]
        );

        res.json({ success: true, data: rows, page, limit });
    } catch (error) {
        console.error('Error fetching customers report:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch customers report' });
    }
});

// GET /api/reports/payments
router.get('/payments', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM vw_payment_mix');
        res.json({ success: true, data: rows });
    } catch (error) {
        console.error('Error fetching payments report:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch payments report' });
    }
});

// GET /api/reports/inventory
router.get('/inventory', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM vw_inventory_risk');
        res.json({ success: true, data: rows });
    } catch (error) {
        console.error('Error fetching inventory report:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch inventory report' });
    }
});

// GET /api/reports/ranking
router.get('/ranking', async (req, res) => {
    try {
        const search = req.query.search as string || '';
        const page = parseInt(req.query.page as string || '1');
        const limit = 5;
        const offset = (page - 1) * limit;

        const { rows } = await pool.query(
            `SELECT * FROM vw_top_products_ranked 
       WHERE producto ILIKE $1 
       LIMIT $2 OFFSET $3`,
            [`%${search}%`, limit, offset]
        );

        res.json({ success: true, data: rows, page, limit, search });
    } catch (error) {
        console.error('Error fetching ranking report:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch ranking report' });
    }
});

export default router;
