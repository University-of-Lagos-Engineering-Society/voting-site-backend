const Category = require('../models/Category');

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = new Category({ name });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'An error occurred while creating the category' });
  }
};

// Edit category
exports.editCategory = async (req, res) => {
  try {
    const { name, category, image } = req.body;
    const editCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name, category},
      { new: true }
    );
    if (!editCategory) {
      return res.status(404).json({ error: 'Nominee not found' });
    }
    res.json(editCategory);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error retrieving categories:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the categories' });
  }
};

exports.getNomineesByCategory = async (req, res) => {
  try {
    //const categoryId = req.params.categoryId;

    // Find the category by ID and populate the nominees field
    const category = await Category.findById(req.params.id).populate('nominees');
    console.log(category)
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const nominees = category.nominees;
    res.json(nominees);
  } catch (error) {
    console.error('Error retrieving nominees by category:', error);
    res.status(500).json({ error: 'Failed to retrieve nominees' });
  }
};
