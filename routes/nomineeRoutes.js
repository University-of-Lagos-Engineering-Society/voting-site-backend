const express = require('express');
const router = express.Router();
const nomineeController = require('../controllers/NomineeController');
const isAdmin = require("../middlewares/admin");

// GET /nominees - Get all nominees
router.get('/', nomineeController.getAllNominees);

// router.get('/admin', nomineeController.getAllNomineesAdmin);

router.get('/category/:categoryId', nomineeController.getNomineesByCategory);

// GET /nominees/:id - Get a single nominee by ID
router.get('/:id', isAdmin, nomineeController.getNomineeById);

//Create nominees
router.post('/', isAdmin, nomineeController.addNominee)

//Update nominee
router.put('/:id', isAdmin, nomineeController.updateNominee);

//Delete nominee
router.delete('/:id', isAdmin,  nomineeController.deleteNominee);

module.exports = router;
