const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const LeadProvider = require('../../models/LeadProvider');

// @route   Post api/posts
// @desc    Create a post
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const newLeadProvider = new LeadProvider({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      companyName: req.body.CompanyName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      user: req.user.id,
    });

    const leadProvider = await newLeadProvider.save();

    res.json(leadProvider);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/posts
// @desc    Create all posts
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const leadProvider = await LeadProvider.find().sort({ date: -1 });
    res.json(leadProvider);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/posts/:id
// @desc    Get post by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const leadProvider = await LeadProvider.findById(req.params.id);
    if (!leadProvider) {
      return res.status(404).json({ msg: 'Lead Provider not found' });
    }

    res.json(leadProvider);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Lead Provider not found' });
    }

    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const leadProvider = await LeadProvider.findById(req.params.id);

    if (!leadProvider) {
      return res.status(404).json({ msg: 'Lead Provider not found' });
    }

    // Check user
    if (leadProvider.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await leadProvider.remove();

    res.json({ msg: 'Lead Provider removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Lead Provider not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
