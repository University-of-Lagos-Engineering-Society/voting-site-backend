const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  _id: { type: Number },
  name: { type: String, required: true },
  type: { type: String, required: true },
}, { _id: false });

categorySchema.index({ name: 1, type: 1 }, { unique: true });
categorySchema.plugin(AutoIncrement);

const Category = mongoose.model('Category', categorySchema);

const getCategories = async function() {
  const categories = await Category.find();
  const result = {};
  for(cat of categories) {
    result[cat._id] = [cat.name, cat.type, cat._id];
  }
  return result;
};

module.exports = { Category, getCategories };
