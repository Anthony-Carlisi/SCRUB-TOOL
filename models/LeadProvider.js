const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leadProviderSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    companyName: {
      type: String,
    },
    email: {
      type: String,
    },
    phoneNumber: {
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

module.exports = mongoose.model('leadProvider', leadProviderSchema);
