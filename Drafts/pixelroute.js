const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const Pixel = require('./Pixel');

// @route   Post api/pixel
// @desc    Create a pixel
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const newPixel = new Pixel({
      name: req.body.name,
      user: req.user.id,
      date: !req.body.date ? Date.now() : req.body.date,
    });

    const pixel = await newPixel.save();

    res.json(pixel);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// @route   PUT api/pixel/:id
// @desc    Pixel uptick
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    let pixel = await Pixel.findById(req.params.id);

    pixel.hit = pixel.hit + 1;

    const pixelUpdate = await pixel.save();

    res.json(pixelUpdate);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/lead
// @desc    Get all leads
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const lead = await Lead.find().sort({ date: -1 });
    res.json(lead);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/lead/:id
// @desc    Get lead by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ msg: 'Lead not found' });
    }
    res.json(lead);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Lead not found' });
    }

    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/lead/:id
// @desc    Delete a lead
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ msg: 'Lead not found' });
    }

    // Check user
    if (lead.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await lead.remove();

    res.json({ msg: 'Lead removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Lead not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
