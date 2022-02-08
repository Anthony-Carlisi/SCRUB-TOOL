const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leadSchema = new mongoose.Schema(
  {
    leadList: {
      type: Schema.Types.ObjectId,
      ref: 'leadList',
    },
    leadProvider: {
      type: Schema.Types.ObjectId,
      ref: 'leadProvider',
    },
    purchaseDate: {
      type: Date,
      default: Date.now,
    },
    leadInfo: {},
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

module.exports = mongoose.model('lead', leadSchema);
