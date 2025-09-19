const db = require('../database');

class Guest {
    static create(guestData, callback) {
        const { name, email, phone } = guestData;
        db.run(
            "INSERT INTO guests (name, email, phone) VALUES (?, ?, ?)",
            [name, email, phone],
            function(err) {
                callback(err, this.lastID);
            }
        );
    }

    static getAll(callback) {
        db.all("SELECT * FROM guests ORDER BY name", callback);
    }

    static getById(id, callback) {
        db.get("SELECT * FROM guests WHERE id = ?", [id], callback);
    }
}

module.exports = Guest;
