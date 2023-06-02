const express = require('express');
const router = express.Router();
const nomineeController = require('../controllers/NomineeController');

// GET /nominees - Get all nominees
router.get('/', nomineeController.getAllNominees);

// GET /nominees/:id - Get a single nominee by ID
router.get('/:id', nomineeController.getNomineeById);

// POST /nominees - Add a new nominee
router.post('/', nomineeController.addNominee);

// PUT /nominees/:id - Update a nominee
router.put('/:id', nomineeController.updateNominee);

// DELETE /nominees/:id - Delete a nominee
router.delete('/:id', nomineeController.deleteNominee);

module.exports = router;
