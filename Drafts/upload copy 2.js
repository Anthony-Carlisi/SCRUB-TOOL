const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
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

const Upload = require('../models/Upload');
const User = require('../models/User');

// @route   Post api/upload
// @desc    Create an Upload
// @access  Private
router.post(
  '/',
  [uploadFile.single('file')],
  [auth],
  [check('description', 'File name is required').not().isEmpty()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const user = await User.findById(req.user.id).select('-password');

      //convert csvfile to jsonArray
      const csvData = await csv().fromFile(req.file.path);

      for (let i = 0; i < csvData.length; i++) {
        const newUpload = new Upload({
          fileName: req.file.originalname,
          description: req.body.description,
          name: user.name,
          user: req.user.id,
          cost: req.body.cost,
          leadUpload: csvData[i],
          purchaseDate: !req.body.purchaseDate
            ? Date.now()
            : req.body.purchaseDate,
        });
        newUpload.save();
      }

      //      const uploaded = await

      res.json('Completed');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
