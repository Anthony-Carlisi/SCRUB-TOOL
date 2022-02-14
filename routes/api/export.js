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
const DupBlockRule = require('../../models/DupBlockRule');

const apiKey = config.get('airtableApiKey');
const baseId = config.get('airtableBase');

const base = new Airtable({ apiKey: apiKey }).base(baseId);

// @route   Post api/export
// @desc    Create an Export
// @access  Private
router.post('/', [auth], async (req, res) => {
  try {
    const leadList = await LeadList.findById(req.body.leadList);

    const dupBlockRule = await DupBlockRule.findById(req.body.dupBlockRule);

    const leads = await Lead.find({
      leadList: ObjectId(req.body.leadList),
    });

    let headerFields = Object.keys(leads[0].lead);

    const airtableSearch = async () => {
      try {
        const records = await base('Merchant Records')
          .select({
            filterByFormula: dupBlockRule.filterByFormula,
          })
          .all();
        return records;
      } catch (error) {
        console.log(error);
      }
    };

    let dupParams = await airtableSearch();

    let arr = leads;
    let dupBlockLeads = [];
    for (let i = 0; i < leads.length; i++) {
      for (let j = 0; j < dupParams.length; j++) {
        if (
          dupParams[j].fields['Business Phone'] === leads[i].phone ||
          dupParams[j].fields['Owner 1 Mobile'] === leads[i].phone
        ) {
          arr.splice(leads[i], 1);
          //leads[i].lead.push({ 'Dup Blocked MID': dupParams[j].fields.MID });
          let obj = leads[i].lead;
          obj['Dup Blocked MID'] = dupParams[j].fields.MID;
          dupBlockLeads.push(obj);
        }
      }
    }
    console.log(dupBlockLeads.length);
    let comp = [];
    for (let i = 0; i < arr.length; i++) comp.push(arr[i].lead);

    /*
    function storelead(data) {
      // This creates an array of Promise objects, which can be
      // executed in parallel.
      const promises = data.map((leadCheck) => {
        for (let i = 0; i < dupParams.length; i++) {
          if (
            !dupParams[i].fields['Business Phone'] === leadCheck.phone ||
            !dupParams[i].fields['Owner 1 Mobile'] === leadCheck.phone
          ) {
            return leadCheck.lead;
          }
        }
      });
      return Promise.all(promises);
    }

    const leadArr = await storelead(leads);

    */

    if (comp) {
      const csv = json2csv(comp, headerFields);

      fs.writeFile(
        `./exports/${leadList.listName} Export.csv`,
        csv,
        function (err) {
          if (err) throw err;
          console.log('file saved');
        }
      );
    }

    if (dupBlockLeads) {
      headerFields.push('Dup Blocked MID');
      const csv2 = json2csv(dupBlockLeads, headerFields);
      fs.writeFile(
        `./exports/${leadList.listName} DupBlock Export.csv`,
        csv2,
        function (err) {
          if (err) throw err;
          console.log('file saved');
        }
      );
    }

    res.json('Export Started...');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
