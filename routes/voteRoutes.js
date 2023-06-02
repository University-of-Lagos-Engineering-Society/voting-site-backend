const express = require('express');
const router = express.Router();
const voteController = require('../controllers/VoteController');

// POST /votes/:nomineeId - Vote for a nominee
router.post('/:nomineeId', voteController.voteForNominee);

// GET /votes/:nomineeId/count - Get the vote count for a nominee
router.get('/:nomineeId/count', voteController.getVoteCountForNominee);

module.exports = router;
