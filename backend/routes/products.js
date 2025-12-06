const express = require('express');
const router = express.Router();
const db = require('../db');

// Helper to build query with filters
router.get('/', (req, res) => {
  const { search = '', category = '', page = 1, limit = 8 } = req.query;
  const offset = (Math.max(parseInt(page, 10), 1) - 1) * parseInt(limit, 10);

  let where = 'WHERE 1=1';
  const params = [];
  if (search) {
    where += ' AND name LIKE ?';
    params.push(`%${search}%`);
  }
  if (category) {
    where += ' AND category = ?';
    params.push(category);
  }

  const countQuery = `SELECT COUNT(*) as total FROM products ${where}`;
  db.get(countQuery, params, (err, row) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    const total = row.total;
    const query = `SELECT * FROM products ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`;
    db.all(query, [...params, parseInt(limit, 10), offset], (err2, rows) => {
      if (err2) return res.status(500).json({ error: 'DB error' });
      res.json({
        products: rows,
        pagination: { total, page: parseInt(page, 10), limit: parseInt(limit, 10) }
      });
    });
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (!row) return res.status(404).json({ error: 'Product not found' });
    res.json({ product: row });
  });
});

module.exports = router;
