const express = require('express');
const router = express.Router();
const db = require('../db');

// Create enquiry
router.post('/', (req, res) => {
  const { product_id = null, name, email, phone = '', message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email and message are required' });
  }
  const stmt = `INSERT INTO enquiries (product_id, name, email, phone, message) VALUES (?, ?, ?, ?, ?)`;
  db.run(stmt, [product_id, name, email, phone, message], function (err) {
    if (err) return res.status(500).json({ error: 'DB write error' });
    res.status(201).json({ id: this.lastID, created_at: new Date().toISOString() });
  });
});

// List enquiries (admin)
router.get('/', (req, res) => {
  db.all(`SELECT e.*, p.name AS product_name
          FROM enquiries e
          LEFT JOIN products p ON e.product_id = p.id
          ORDER BY e.created_at DESC`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json({ enquiries: rows });
  });
});

module.exports = router;
