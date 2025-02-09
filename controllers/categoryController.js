const pool = require('../config/db');

const getAllCategories = (req, res) => {
    pool.query('SELECT * FROM category', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

const getCategoryById = (req, res) => {
    const { id } = req.params;
    
    pool.query('SELECT * FROM category WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.json(results[0]); // Return the single category object
    });
};


const createCategory = (req, res) => {
    const { categoryName } = req.body;
    pool.query('INSERT INTO category (categoryName) VALUES (?)', [categoryName], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Category added successfully', id: results.insertId });
    });
};

const updateCategory = (req, res) => {
    const { id } = req.params;
    const { categoryName } = req.body;
    pool.query('UPDATE category SET categoryName = ? WHERE id = ?', [categoryName, id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Category updated successfully' });
    });
};

const deleteCategory = (req, res) => {
    const { id } = req.params;
    pool.query('DELETE FROM category WHERE id = ?', [id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Category deleted successfully' });
    });
};

module.exports = { getAllCategories, createCategory, updateCategory, deleteCategory, getCategoryById };
