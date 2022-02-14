const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pixelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    hit: {
      type: Number,
      default: 0,
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

module.exports = mongoose.model('pixel', pixelSchema);
