const db = require('../database');

class Room {
    static getAll(callback) {
        db.all("SELECT * FROM rooms ORDER BY category", callback);
    }

    static create(roomData, callback) {
        const { category, price_per_night, description } = roomData;
        db.run(
            "INSERT INTO rooms (category, price_per_night, description) VALUES (?, ?, ?)",
            [category, price_per_night, description],
            callback
        );
    }

    static getAvailableRooms(checkIn, checkOut, callback) {
        const query = `
            SELECT r.* 
            FROM rooms r
            WHERE r.id NOT IN (
                SELECT room_id 
                FROM bookings 
                WHERE status = 'confirmed' 
                AND (
                    (check_in_date <= ? AND check_out_date >= ?) OR
                    (check_in_date <= ? AND check_out_date >= ?) OR
                    (check_in_date >= ? AND check_out_date <= ?)
                )
            )
        `;
        db.all(query, [checkOut, checkIn, checkIn, checkOut, checkIn, checkOut], callback);
    }

    static getById(id, callback) {
        db.get("SELECT * FROM rooms WHERE id = ?", [id], callback);
    }
}

module.exports = Room;
