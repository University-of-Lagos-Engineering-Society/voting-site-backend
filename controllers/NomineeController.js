const Nominee = require('../models/Nominee');
const { Category, getCategories } = require("../models/Category");

let nominees = null;
let nomineesType = {};

const validCategoryTypes = ['general', 'graduate', 'undergraduate'];


// Get all nominees
const getAllNominees = async (req, res) => {
  try {
    if(!nominees) {
        const nomineesGrouped = [];
        const nomineesList = await Nominee.find().select('-votes');
        const categories = await getCategories();
        for(const nom of nomineesList) {
          const category = nomineesGrouped.find(n => n.category_name === categories[nom.category][0]);
          const nomineeData = {
            id: nom.id,
            name: nom.name,
            image: nom.image || "no_image"
          };
          if(!category) {
            nomineesGrouped.push({
              category_id: nom.category,
              category_name: categories[nom.category][0],
              category_type: categories[nom.category][1],
              nominees: [nomineeData]
            })
          } else {
            category.nominees.push(nomineeData);
          }
        }
        nominees = nomineesGrouped;
    };
    return res.json(nominees);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllNomineesByCategoryType = async (req, res) => {
  try {
    const type = req.params.categoryType.toLowerCase();
    if(!type || !validCategoryTypes.includes(type)) {
      return res.status(400).json({ error: 'Invalid category type.' });
    }
    if(!nomineesType[type]) {
      const nomineesGrouped = [];
      const categories = await getCategories();
      const catTypeIds = [];
      for(let [_, catType, id] of Object.values(categories)) {
        if(catType === type) catTypeIds.push(id);
      }
      const nomineesList = await Nominee.find({ category : { $in : catTypeIds }}).select('-votes');
      for(const nom of nomineesList) {
        const category = nomineesGrouped.find(n => n.category_name === categories[nom.category][0]);
        const nomineeData = {
          id: nom.id,
          name: nom.name,
          image: nom.image || "no_image"
        };
        if(!category) {
          nomineesGrouped.push({
            category_id: nom.category,
            category_name: categories[nom.category][0],
            nominees: [nomineeData]
          })
        } else {
          category.nominees.push(nomineeData);
        }
      }
      nomineesType[type] = nomineesGrouped;
    };
    return res.json(nomineesType[type]);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
  try {
    const nominees = req.body.nominees; // Array of nominee objects

    // Create multiple nominees using the array of objects
    const failed = [];
    for(nom of nominees) {
      try {
        await Nominee.create(nom);
      } catch(err) {
        failed.push(`${nom.name} for category ${nom.category} failed: ${err.message}`);
      }
    }

    res.status(200).json({ message: "Nominees added", failed });
  } catch (error) {
    console.error('Error creating nominees:', error);
    res.status(400).json({ error: error.message });
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
  getAllNomineesByCategoryType,
  getAllNomineesAdmin,
  getNomineesByCategory,
  getNomineeById,
  addNominee,
  updateNominee,
  deleteNominee,
};
