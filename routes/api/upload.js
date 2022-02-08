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
var uploadFile = multer({ storage: storage });

const User = require('../../models/User');
const Lead = require('../../models/Lead');
const LeadList = require('../../models/LeadList');
const LeadProvider = require('../../models/LeadProvider');

// @route   Post api/upload
// @desc    Create an Upload
// @access  Private
router.post('/', [uploadFile.single('file')], [auth], async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const leadProvider = await LeadProvider.findById(req.body.leadProvider);
    const csvData = await csv().fromFile(req.file.path);
    console.log(req.file);

    const newLeadList = new LeadList({
      listName: req.file.originalname,
      description: req.body.description,
      cost: req.body.cost,
      purchaseDate: !req.body.purchaseDate ? Date.now() : req.body.purchaseDate,
      user: req.user.id,
      leadProvider: leadProvider.id,
    });

    const leadList = await newLeadList.save();
    console.log(leadList);

    //convert csvfile to jsonArray

    //    console.log(Object.keys(csvData[0]));

    for (let i = 0; i < csvData.length; i++) {
      const newLead = new Lead({
        phone: req.body.phone,
        dupBlock: req.body.dupBlock,
        dupBlockRule: req.body.dupBlockRule,
        user: req.user.id,
        leadInfo: req.body.leadInfo,
      });

      newLead.save();
    }

    res.json('Upload Started...');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
