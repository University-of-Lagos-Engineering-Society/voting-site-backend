const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  _id: { type: Number },
  name: { type: String, required: true, unique: true },
}, { _id: false });

categorySchema.plugin(AutoIncrement);

const Category = mongoose.model('Category', categorySchema);

const getCategories = async function() {
  const categories = await Category.find();
  const result = {};
  for(cat of categories) {
    result[cat._id] = cat.name
  }
  return result;
};

module.exports = { Category, getCategories };
