const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const LeadList = require('../../models/LeadList');

// @route   Post api/leadList
// @desc    Create a lead list
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const newLeadList = new LeadList({
      listName: req.body.listName,
      description: req.body.description,
      cost: req.body.cost,
      purchaseDate: !req.body.purchaseDate ? Date.now() : req.body.purchaseDate,
      user: req.user.id,
      leadProvider: req.body.leadProvider,
    });

    const leadList = await newLeadList.save();

    res.json(leadList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/leadsList
// @desc    Get all lead lists
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const leadList = await LeadList.find().sort({ date: -1 });
    res.json(leadList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/leadList/:id
// @desc    Get lead list by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const leadList = await LeadList.findById(req.params.id);
    if (!leadList) {
      return res.status(404).json({ msg: 'Lead List not found' });
    }

    res.json(leadList);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Lead List not found' });
    }

    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/leadList/:id
// @desc    Delete a lead list
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const leadList = await LeadList.findById(req.params.id);

    if (!leadList) {
      return res.status(404).json({ msg: 'Lead List not found' });
    }

    // Check user
    if (leadList.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await leadList.remove();

    res.json({ msg: 'Lead List removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Lead List not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
