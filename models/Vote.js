const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
  ip: { type: Schema.Types.String },
  category_type : { type: Schema.Types.String },
  date: { type: Date, default: Date.now },
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
