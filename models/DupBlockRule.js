const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DupBlockRuleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    filterByFormula: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { strict: false }
);

module.exports = mongoose.model('dupBlockRule', DupBlockRuleSchema);
