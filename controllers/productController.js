const pool = require('../config/db');

const getAllProducts = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;

    pool.query(
        `SELECT p.id, p.productId, p.productName, c.categoryName, p.categoryId 
         FROM product p 
         JOIN category c ON p.categoryId = c.id 
         LIMIT ?, ?`, 
        [offset, pageSize], 
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(results);
        }
    );
};


const createProduct = (req, res) => {
    const { productId, productName, categoryId } = req.body;
    pool.query('INSERT INTO product (productId, productName, categoryId) VALUES (?, ?, ?)', 
    [productId, productName, categoryId], 
    (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Product added successfully', id: results.insertId });
    });
};

const updateProduct = (req, res) => {
    const { id } = req.params;
    const { productId, productName, categoryId } = req.body;
    pool.query('UPDATE product SET productId = ?, productName = ?, categoryId = ? WHERE id = ?', 
    [productId, productName, categoryId, id], 
    (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Product updated successfully' });
    });
};

const deleteProduct = (req, res) => {
    const { id } = req.params;
    pool.query('DELETE FROM product WHERE id = ?', [id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Product deleted successfully' });
    });
};
const getProductById = (req, res) => {
    const productId = req.params.id; // Get product ID from the URL parameter

    // Query the database for the specific product
    pool.query('SELECT p.id, p.productId, p.productName, c.categoryName, p.categoryId FROM product p JOIN category c ON p.categoryId = c.id WHERE p.id = ?', [productId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // If the product is not found
        if (results.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // If product is found, send the data as the response
        res.json(results[0]);
    });
};

module.exports = { getAllProducts, createProduct, updateProduct, deleteProduct, getProductById };
