const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: { type: String, required: true },
 // nominees: [{ type: Schema.Types.ObjectId, ref: 'Nominee' }], returning an empty array of nominees.
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
