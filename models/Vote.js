const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
  nominee: { type: Schema.Types.ObjectId, ref: 'Nominee', required: true },
  // Add other fields as per your requirements, e.g., user who voted
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
