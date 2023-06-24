const Nominee = require('../models/Nominee');
const Category = require('../models/Category');

let nominees = null;
// Get all nominees
const getAllNominees = async (req, res) => {
  try {
    if(!nominees) {
        nominees = await Nominee.find().select('-votes').populate('category');
    }; 
    res.json(nominees);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllNomineesAdmin = async (req, res) => {
  try {
       const nomineesAdmin = await Nominee.find().populate('category');
    
    res.json(nomineesAdmin);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getNomineesByCategory = async (req, res) =>{
  try {
    const categoryId = req.params.categoryId;

    // Find the category by ID
    const category = await Category.findById(categoryId).populate('nominees');
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    const nominees = await Nominee.find({ category : categoryId }).populate('category');

    res.json(nominees);
  } catch (error) {
    console.error('Error retrieving nominees by category:', error);
    res.status(500).json({ error: 'Failed to retrieve nominees' });
  }

};

// Get a single nominee by ID
const getNomineeById = async (req, res) => {
  try {
    const nominee = await Nominee.findById(req.params.id).populate('category');
    if (!nominee) {
      return res.status(404).json({ error: 'Nominee not found' });
    }
    res.json(nominee);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Add a new nominee
const addNominee = async (req, res) => {
 /* try {
    const { name, category, image } = req.body;
    const nominee = new Nominee({ name, category, image });
    await nominee.save();
    res.status(201).json(nominee);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }*/
  try {
    const nominees = req.body; // Array of nominee objects

    // Create multiple nominees using the array of objects
    const createdNominees = await Nominee.create(nominees);

    res.status(201).json({ nominees: createdNominees });
  } catch (error) {
    console.error('Error creating nominees:', error);
    res.status(500).json({ error: 'Failed to create nominees' });
  }
};

// Update a nominee
const updateNominee = async (req, res) => {
  try {
    const { name, category, image } = req.body;
    const updatedNominee = await Nominee.findByIdAndUpdate(
      req.params.id,
      { name, category, image },
      { new: true }
    );
    if (!updatedNominee) {
      return res.status(404).json({ error: 'Nominee not found' });
    }
    res.json(updatedNominee);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a nominee
const deleteNominee = async (req, res) => {
  try {
    const deletedNominee = await Nominee.findByIdAndRemove(req.params.id);
    if (!deletedNominee) {
      return res.status(404).json({ error: 'Nominee not found' });
    }
    res.json({deletedNominee});
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllNominees,
  getAllNomineesAdmin, 
  getNomineesByCategory,
  getNomineeById,
  addNominee,
  updateNominee,
  deleteNominee,
};
