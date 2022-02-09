const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const ObjectId = require('mongodb').ObjectID;
const Airtable = require('airtable');
const config = require('config');

const json2csv = require('json2csv').parse;
const fs = require('fs');

const Lead = require('../../models/Lead');
const LeadList = require('../../models/LeadList');
const LeadProvider = require('../../models/LeadProvider');

const apiKey = config.get('airtableApiKey');
const baseId = config.get('airtableBase');

const base = new Airtable({ apiKey: apiKey }).base(baseId);

// @route   Post api/upload
// @desc    Create an Upload
// @access  Private
router.post('/', [auth], async (req, res) => {
  try {
    const leadList = await LeadList.findById(req.body.leadList);

    const leads = await Lead.find({
      'leadInfo.leadList': ObjectId(req.body.leadList),
    });

    let leadArr = [];
    let headerFields = [];

    for (let i = 0; i < leads.length; i++) {
      for (let j = 0; j < leads[i].leadInfo.length; j++) {
        if (
          leads[i].leadInfo[j].leadList._id.toHexString() === req.body.leadList
        ) {
          leadArr.push(leads[i].leadInfo[j].lead);
          let header = Object.keys(leads[i].leadInfo[j].lead);
          headerFields = [...header];
        }
      }
    }

    const csv = json2csv(leadArr, headerFields);

    fs.writeFile(`${leadList.listName} Export.csv`, csv, function (err) {
      if (err) throw err;
      console.log('file saved');
    });

    const airtableSearch5 = async () => {
      try {
        const records = await base('Merchant Records')
          .select({
            filterByFormula: `DATETIME_DIFF({Status Change Date (DUPS)}, DATEADD(TODAY(),-90,'days'), 'days') > 0`,
          })
          .all();
        return records;
      } catch (error) {
        console.log(error);
      }
    };

    console.log(
      airtableSearch5().then((res) => {
        console.log(res);
      })
    );

    res.json('Export Started...');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
