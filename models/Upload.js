const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UploadSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cost: {
    type: Schema.Types.Decimal128,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  name: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model('upload', UploadSchema);
