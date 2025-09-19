const db = require('../database');

class Booking {
    static create(bookingData, callback) {
        const { guest_id, room_id, check_in_date, check_out_date, total_amount } = bookingData;
        db.run(
            `INSERT INTO bookings (guest_id, room_id, check_in_date, check_out_date, total_amount) 
             VALUES (?, ?, ?, ?, ?)`,
            [guest_id, room_id, check_in_date, check_out_date, total_amount],
            function(err) {
                callback(err, this.lastID);
            }
        );
    }

    static getAll(callback) {
        const query = `
            SELECT b.*, g.name as guest_name, g.email, g.phone, r.category as room_category
            FROM bookings b
            JOIN guests g ON b.guest_id = g.id
            JOIN rooms r ON b.room_id = r.id
            ORDER BY b.created_at DESC
        `;
        db.all(query, callback);
    }

    static getById(id, callback) {
        const query = `
            SELECT b.*, g.name as guest_name, g.email, g.phone, 
                   r.category as room_category, r.price_per_night
            FROM bookings b
            JOIN guests g ON b.guest_id = g.id
            JOIN rooms r ON b.room_id = r.id
            WHERE b.id = ?
        `;
        db.get(query, [id], callback);
    }

    static cancel(id, callback) {
        db.run("UPDATE bookings SET status = 'cancelled' WHERE id = ?", [id], callback);
    }
}

module.exports = Booking;
