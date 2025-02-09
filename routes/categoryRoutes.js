const express = require('express');
const router = express.Router();
const { getAllCategories, createCategory, updateCategory, deleteCategory, getCategoryById } = require('../controllers/categoryController.js');

router.get('/', getAllCategories);
router.get('/:id',getCategoryById)
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router; // ✅ Make sure this is correct
