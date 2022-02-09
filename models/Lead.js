const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leadSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      unique: true,
    },
    dupBlock: {
      type: Boolean,
      default: false,
    },
    dupBlockRule: [
      {
        dupBlockRuleId: {
          //type: Schema.Types.ObjectId,
          //ref: 'dupBlockRule',
          type: String,
        },
        date: {
          type: Date,
        },
      },
    ],
    leadInfo: [
      {
        leadList: {
          type: Schema.Types.ObjectId,
          ref: 'leadList',
        },
        leadProvider: {
          type: Schema.Types.ObjectId,
          ref: 'leadProvider',
        },
        lead: {},
      },
    ],
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
