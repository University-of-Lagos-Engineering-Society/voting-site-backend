const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const { Category } = require("./Category");
const Schema = mongoose.Schema;

const nomineeSchema = new Schema({
  _id: { type: Number },
  name: { type: String, required: true },
  category: { type: Number, ref: 'Category', required: true },
  image: { type: String },
  votes: { type: Number, default: 0 },
  order: { type: Number, default: 100, required: true }
}, { _id: false });

nomineeSchema.index({ name: 1, category: 1 }, { unique: true });

nomineeSchema.plugin(AutoIncrement, { id: "nom_id", inc_field : "_id"});

// Pre-save middleware to check if userId exists
nomineeSchema.pre('save', async function (next) {
  try {
    const category = await Category.findById(this.category);
    if (!category) {
      throw new Error('Referenced category does not exist');
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Nominee = mongoose.model('Nominee', nomineeSchema);

module.exports = Nominee;
