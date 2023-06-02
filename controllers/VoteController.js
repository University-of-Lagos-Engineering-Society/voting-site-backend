const Vote = require('../models/Vote');
const Nominee = require('../models/Nominee');

// Vote for a nominee
const voteForNominee = async (req, res) => {
  try {
    const { nomineeId } = req.params;
    
    // Check if the nominee exists
    const nominee = await Nominee.findById(nomineeId);
    if (!nominee) {
      return res.status(404).json({ error: 'Nominee not found' });
    }
    
    // Create a new vote
    const vote = new Vote({ nominee: nomineeId });
    await vote.save();
    
    // Increment the vote count of the nominee
    nominee.votes++;
    await nominee.save();
    
    res.status(201).json({ message: 'Vote recorded' });
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

module.exports = {
  voteForNominee,
  getVoteCountForNominee,
};
