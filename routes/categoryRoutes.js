const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Create a new category
//router.post('/', categoryController.createCategory);

// Get all categories
router.get('/', categoryController.getCategories);

// Get nominees in a category
router.get('/:id/nominees', categoryController.getNomineesByCategory);




module.exports = router;
