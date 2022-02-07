const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leadListSchema = new mongoose.Schema(
  {
    listName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    leadProviderId: {
      type: Schema.Types.ObjectId,
      ref: 'leadProvider',
    },
    leadProviderName: {
      type: String,
    },
    purchaseDate: {
      type: Date,
      default: Date.now,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { strict: false }
);

module.exports = mongoose.model('leadList', leadListSchema);
