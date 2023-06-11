const Vote = require('../models/Vote');
const Nominee = require('../models/Nominee');
const Category = require('../models/Category')

// Vote for a nominee
const voteForNominees = async (req, res) => {
  try {
    const { nominees } = req.body;

    // Check if the required number of nominees is provided
    const categories = Object.keys(nominees);
    if (categories.length === 0) {
      return res.status(400).json({ error: 'No nominees provided' });
    }

    // Check if the provided nominees are valid and belong to different categories
    const validNominees = {};
    for (const category of categories) {
      const nomineeId = nominees[category];

      // Check if the nominee exists
      const nominee = await Nominee.findOne({ _id: nomineeId, category: category });
      if (!nominee) {
        return res.status(404).json({ error: `Nominee not found for category: ${category}` });
      }

      // Store the valid nominee for each category
      validNominees[category] = nominee;
    }

    // Create votes for the valid nominees
    const votes = [];
    for (const category in validNominees) {
      const nominee = validNominees[category];
      const vote = new Vote({ nominee: nominee._id });
      await vote.save();
      votes.push(vote);
    }

    // Increment the vote count for each nominee
    const nomineeIds = votes.map((vote) => vote.nominee);
    await Nominee.updateMany({ _id: { $in: nomineeIds } }, { $inc: { votes: 1 } });

    res.status(201).json({ message: 'Votes recorded', votes });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
  };


// Get the vote count for a nominee
const getVoteCountForNominee = async (req, res) => {
  try {
    const { nomineeId } = req.params;
    
    // Check if the nominee exists
    const nominee = await Nominee.findById(nomineeId);
    if (!nominee) {
      return res.status(404).json({ error: 'Nominee not found' });
    }
    
    res.json({ count: nominee.votes });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

/*
const getVotesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Find the category by ID and populate the nominees field
    const category = await Category.findById(categoryId).populate('nominees');
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Get the nominees and their vote counts
    const nominees = category.nominees.map((nominee) => ({
      nomineeId: nominee._id,
      voteCount: nominee.votes,
    }));

    res.json({ categoryId, nominees });
  } catch (error) {
    res.status(500).json({ error: 'Internal server Error' });
  }
};

returning an empty array of nominees while they have already been created.
*/ 



module.exports = {
  voteForNominees,
  getVoteCountForNominee,
  //getVotesByCategory
};
