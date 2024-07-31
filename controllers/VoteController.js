const Nominee = require('../models/Nominee');
const { Category, getCategories} = require('../models/Category')
const Vote = require("../models/Vote");


const validCategoryTypes = ['general', 'graduate', 'undergraduate'];

// Vote for a nominee
const voteForNominees = async (req, res) => {
  try {

    if(process.env.VOTING_CLOSED == "true") {
      return res.status(400).json({ error: "Voting closed." });
    }
    const { votes } = req.body;
    const categoryType = req.params.categoryType.toLowerCase();
    if(!categoryType.trim() || !validCategoryTypes.includes(categoryType)) return res.status(400).json({ error: "Invalid voting category type" });

    if(!votes) return res.status(400).send({ error : "No votes provided."});

    // Check if the required number of nominees is provided
    const categories = Object.keys(votes);
    const nominees = Object.values(votes);

    //validate categories
    if (categories.length === 0) {
      return res.status(400).json({ error: 'No nominees provided' });
    }
    const validCategoriesCount = await Category.countDocuments({_id : {$in : categories}, type: categoryType});
    if(validCategoriesCount !== categories.length) {
      return res.status(400).json({ error: 'Invalid voting categories' });
    }

    //update nominees votes
    await Nominee.updateMany({ _id: { $in: nominees }, category : { $in: categories } }, { $inc: { votes: 1 } });

    //for stat purposes
    try {
      await Vote.create({
        ip: req.ip,
        category_type: categoryType
      })
    } catch(err) {
      console.log(err);
    }


    return res.json({ message: 'Votes recorded' });
  } catch (error) {
    res.status(500).json({ error: error.message });
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


const getVotesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findById(categoryId).lean();
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Find the category by ID and populate the nominees field
    const nominees = await Nominee.find({ category: categoryId } ).select('id name votes').sort('-votes').lean();

    return res.render('votes', { votes: nominees, category: category })
  } catch (error) {
    res.status(500).json({ error: 'Internal server Error' });
  }
};


const getAllVotes = async (req, res) => {
  try {
    const nomineesGrouped = [];
    const nomineesList = await Nominee.find().select('id name votes category').sort('-votes');
    const categories = await getCategories();
    for(const nom of nomineesList) {
      const category = nomineesGrouped.find(n => n.category_name === categories[nom.category][0]);
      const nomineeData = {
        name: nom.name,
        votes: nom.votes
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
    return res.json(nomineesGrouped);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = {
  voteForNominees,
  getVoteCountForNominee,
  getVotesByCategory,
  getAllVotes
};
