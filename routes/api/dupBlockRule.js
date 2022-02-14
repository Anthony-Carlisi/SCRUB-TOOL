const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const DupBlockRule = require('../../models/DupBlockRule');

// @route   Post api/dupBlockRule
// @desc    Create a Dup Block Rule
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const newDupBlockRule = new DupBlockRule({
      filterByFormula: req.body.filterByFormula,
      name: req.body.name,
      user: req.user.id,
    });

    const dupBlockRule = await newDupBlockRule.save();

    res.json(dupBlockRule);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/dupBlockRule
// @desc    Get all Dup Block Rules
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const dupBlockRule = await DupBlockRule.find().sort({ date: -1 });
    res.json(dupBlockRule);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/dupBlockRule/:id
// @desc    Get Dup Block Rule by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const dupBlockRule = await DupBlockRule.findById(req.params.id);
    if (!dupBlockRule) {
      return res.status(404).json({ msg: 'Dup Block Rule not found' });
    }
    res.json(dupBlockRule);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Dup Block Rule not found' });
    }

    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/dupBlockRule/:id
// @desc    Delete a Dup Block Rule
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const dupBlockRule = await DupBlockRule.findById(req.params.id);

    if (!dupBlockRule) {
      return res.status(404).json({ msg: 'Dup Block Rule not found' });
    }

    // Check user
    if (dupBlockRule.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await dupBlockRule.remove();

    res.json({ msg: 'Dup Block Rule removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Dup Block Rule not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
