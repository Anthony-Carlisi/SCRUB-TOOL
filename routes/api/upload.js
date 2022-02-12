const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const csv = require('csvtojson');
const fs = require('fs');

const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'temp/');
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
    let csvData = await csv()
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

    let leadListFound = await LeadList.findOne({
      listName: req.file.originalname.split('.')[0],
    });
    /*
    if (leadListFound) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Lead List already uploaded' }] });
    }
*/
    const newLeadList = new LeadList({
      listName: req.file.originalname.split('.')[0],
      description: req.body.description,
      cost: req.body.cost,
      purchaseDate: !req.body.purchaseDate ? Date.now() : req.body.purchaseDate,
      user: req.user.id,
      leadProvider: leadProvider.id,
      leadCount: csvData.length,
    });

    const leadList = await newLeadList.save();

    for (let i = 0; i < csvData.length; i++) {
      csvData[i] = new Lead({
        phone: csvData[i][match],
        dupBlockRule: req.body.dupBlockRule,
        user: req.user.id,
        leadList: leadList.id,
        leadProvider: req.body.leadProvider,
        lead: csvData[i],
      });
    }

    Lead.insertMany(csvData, function (err) {
      if (err) throw err;
    });

    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });

    res.json(`Upload Started...`);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
