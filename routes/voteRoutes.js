const express = require('express');
const router = express.Router();
const voteController = require('../controllers/VoteController');
const { rateLimit } = require("express-rate-limit");
const MongoStore = require("rate-limit-mongo");
const isAdmin = require("../middlewares/admin");

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
        return { error: `You can only vote once every ${process.env.VOTE_LIMIT_WINDOW_HOUR} hr the for ${req.params.categoryType} category. Try again later` }
    },
    keyGenerator: (req, res) => {
        return `${req.ip}-${req.params.categoryType.toLowerCase()}`;
    }
});

// Vote for a nominees
router.post('/:categoryType', limiter, voteController.voteForNominees);

// Get the vote count for a nominee
router.get('/:nomineeId/count', isAdmin, voteController.getVoteCountForNominee);

// Get all votes grouped by category
router.get('/results', isAdmin, voteController.getAllVotes);

// Get the vote count for nominees in a particular category
router.get('/results/:categoryId', isAdmin,  voteController.getVotesByCategory);


module.exports = router;
