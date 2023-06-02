const Nominee = require('../models/Nominee');

// Get all nominees
const getAllNominees = async (req, res) => {
  try {
    const nominees = await Nominee.find().populate('category');
    res.json(nominees);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
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
    const { name, category, image } = req.body;
    const nominee = new Nominee({ name, category, image });
    await nominee.save();
    res.status(201).json(nominee);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
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
    res.json(deletedNominee);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllNominees,
  getNomineeById,
  addNominee,
  updateNominee,
  deleteNominee,
};
