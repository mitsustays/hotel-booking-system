const express = require('express');
const router = express.Router();
const Guest = require('../models/Guest');

// Add guest
router.get('/add', (req, res) => {
    res.render('add-guest');
});

router.post('/add', (req, res) => {
    Guest.create(req.body, (err, guestId) => {
        if (err) return res.status(500).send('Error adding guest');
        res.redirect('/');
    });
});

module.exports = router;
