const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Room = require('../models/Room');
const Guest = require('../models/Guest');
const moment = require('moment');

// Make booking
router.get('/make', (req, res) => {
    Room.getAll((err, rooms) => {
        if (err) return res.status(500).send('Error loading rooms');
        Guest.getAll((err, guests) => {
            if (err) return res.status(500).send('Error loading guests');
            res.render('make-booking', { rooms, guests });
        });
    });
});

router.post('/make', (req, res) => {
    const { guest_id, room_id, check_in_date, check_out_date } = req.body;
    
    Room.getById(room_id, (err, room) => {
        if (err) return res.status(500).send('Error getting room details');
        
        const nights = moment(check_out_date).diff(moment(check_in_date), 'days');
        const total_amount = nights * room.price_per_night;
        
        const bookingData = {
            guest_id,
            room_id,
            check_in_date,
            check_out_date,
            total_amount
        };
        
        Booking.create(bookingData, (err, bookingId) => {
            if (err) return res.status(500).send('Error creating booking');
            res.redirect(`/bookings/voucher/${bookingId}`);
        });
    });
});

// View bookings
router.get('/view', (req, res) => {
    Booking.getAll((err, bookings) => {
        if (err) return res.status(500).send('Error loading bookings');
        res.render('view-bookings', { bookings });
    });
});

// Cancel booking
router.post('/:id/cancel', (req, res) => {
    Booking.cancel(req.params.id, (err) => {
        if (err) return res.status(500).send('Error cancelling booking');
        res.redirect('/bookings/view');
    });
});

// Generate voucher
router.get('/voucher/:id', (req, res) => {
    Booking.getById(req.params.id, (err, booking) => {
        if (err) return res.status(500).send('Error loading booking');
        res.render('booking-voucher', { booking });
    });
});

module.exports = router;
