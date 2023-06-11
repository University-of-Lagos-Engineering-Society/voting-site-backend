const express = require('express');
const router = express.Router();
const voteController = require('../controllers/VoteController');

// Vote for a nominees
router.post('/vote', voteController.voteForNominees);

// Get the vote count for a nominee
router.get('/:nomineeId/count', voteController.getVoteCountForNominee);

// Get the vote count for nominees in a particular category
//router.get('/:categoryId', voteController.getVotesByCategory);


module.exports = router;
