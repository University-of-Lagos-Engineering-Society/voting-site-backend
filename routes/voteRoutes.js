const express = require('express');
const router = express.Router();
const voteController = require('../controllers/VoteController');
const { rateLimit } = require("express-rate-limit");
const MongoStore = require("rate-limit-mongo");
const { isAdmin, resultProtect } = require("../middlewares/admin");

const limiter = rateLimit({
    store: new MongoStore({
        uri: process.env.MONGO_URI,
        expireTimeMs: Number(process.env.VOTE_LIMIT_WINDOW_HOUR || 0) * 60 * 60 * 1000,
        errorHandler: console.error.bind(null, 'rate-limit-mongo')
    }),
    skipFailedRequests: true,
    limit: 1,
    windowMs: Number(process.env.VOTE_LIMIT_WINDOW_HOUR) * 60 * 60 * 1000,
    message : (req, res) => {
        return { error: `You can only vote once every ${process.env.VOTE_LIMIT_WINDOW_HOUR} hr for the ${req.params.categoryType} category. Try again later` }
    },
    keyGenerator: (req, res) => {
        return `${req.ip}-${req.params.categoryType.toLowerCase()}`;
    }
});

// Get all votes grouped by category
router.get('/results', resultProtect, voteController.getAllVotes);
router.post('/results', resultProtect, voteController.getAllVotes);

// Vote for a nominees
router.post('/:categoryType', limiter, voteController.voteForNominees);

// Get the vote count for a nominee
router.get('/:nomineeId/count', resultProtect, voteController.getVoteCountForNominee);
router.post('/:nomineeId/count', resultProtect, voteController.getVoteCountForNominee);

// Get the vote count for nominees in a particular category
router.post('/results/:categoryId', resultProtect,  voteController.getVotesByCategory);
router.get('/results/:categoryId', resultProtect,  voteController.getVotesByCategory);


module.exports = router;
