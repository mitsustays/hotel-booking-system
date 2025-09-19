const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

// Add room category
router.get('/add', (req, res) => {
    res.render('add-room');
});

router.post('/add', (req, res) => {
    Room.create(req.body, (err) => {
        if (err) return res.status(500).send('Error adding room');
        res.redirect('/');
    });
});

// View room availability
router.get('/availability', (req, res) => {
    const { check_in, check_out } = req.query;
    
    if (check_in && check_out) {
        Room.getAvailableRooms(check_in, check_out, (err, rooms) => {
            if (err) return res.status(500).send('Error checking availability');
            res.render('view-availability', { 
                rooms, 
                check_in, 
                check_out,
                hasDates: true 
            });
        });
    } else {
        res.render('view-availability', { 
            rooms: [], 
            hasDates: false 
        });
    }
});

module.exports = router;
