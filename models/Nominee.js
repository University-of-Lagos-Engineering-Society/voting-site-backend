const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nomineeSchema = new Schema({
  name: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  image: { type: String, /*required: true*/ },
  votes: { type: Number, default: 0 },
});

const Nominee = mongoose.model('Nominee', nomineeSchema);

module.exports = Nominee;
