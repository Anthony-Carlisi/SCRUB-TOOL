const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const csv = require('csvtojson');

const multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const uploadFile = multer({ storage: storage });

const Lead = require('../../models/Lead');
const LeadList = require('../../models/LeadList');
const LeadProvider = require('../../models/LeadProvider');

// @route   Post api/upload
// @desc    Create an Upload
// @access  Private
router.post('/', [uploadFile.single('file')], [auth], async (req, res) => {
  try {
    const leadProvider = await LeadProvider.findById(req.body.leadProvider);
    let match;

    const csvData = await csv()
      .fromFile(req.file.path)
      .on('header', (headers) => {
        match = headers.find((element) => {
          if (element.includes('phone')) {
            return true;
          }
        });
      });
    if (match === undefined)
      return res.status(503).json({ msg: 'Phone Number Field not found' });

    // awaits to find if user exists from searching with email
    let leadListFound = await LeadList.findOne({
      listName: req.file.originalname,
    });
    // See if user exists
    if (leadListFound) {
      // if user does exist it will send a response back with user already exists
      return res
        .status(400)
        .json({ errors: [{ msg: 'Lead List already uploaded' }] });
    }

    const newLeadList = new LeadList({
      listName: req.file.originalname,
      description: req.body.description,
      cost: req.body.cost,
      purchaseDate: !req.body.purchaseDate ? Date.now() : req.body.purchaseDate,
      user: req.user.id,
      leadProvider: leadProvider.id,
    });

    const leadList = await newLeadList.save();

    //convert csvfile to jsonArray
    for (let i = 0; i < csvData.length; i++) {
      let lead = await Lead.findOne({ phone: csvData[i][match] });
      // See if lead exists
      if (lead) {
        lead.leadInfo.unshift({
          leadList: leadList.id,
          leadProvider: req.body.leadProvider,
          lead: csvData[i],
        });
      } else {
        lead = new Lead({
          phone: csvData[i][match],
          dupBlockRule: req.body.dupBlockRule,
          user: req.user.id,
          leadInfo: [
            {
              leadList: leadList.id,
              leadProvider: req.body.leadProvider,
              lead: csvData[i],
            },
          ],
        });
      }
      lead.save();
    }

    res.json('Upload Started...');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
