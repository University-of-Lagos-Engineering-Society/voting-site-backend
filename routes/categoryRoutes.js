const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const isAdmin = require("../middlewares/admin");

// Create a new category
router.post('/', isAdmin, categoryController.createCategory);

// Get all categories
router.get('/', categoryController.getCategories);

// Get nominees in a category
// router.get('/:id/nominees', categoryController.getNomineesByCategory);




module.exports = router;
