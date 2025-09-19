const db = require('../database');

const initDatabase = () => {
    // Create rooms table
    db.run(`CREATE TABLE IF NOT EXISTS rooms (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT NOT NULL,
        price_per_night REAL NOT NULL,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
        if (err) console.error('Error creating rooms table:', err);
    });

    // Create guests table
    db.run(`CREATE TABLE IF NOT EXISTS guests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phone TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
        if (err) console.error('Error creating guests table:', err);
    });

    // Create bookings table
    db.run(`CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        guest_id INTEGER,
        room_id INTEGER,
        check_in_date DATE NOT NULL,
        check_out_date DATE NOT NULL,
        total_amount REAL NOT NULL,
        status TEXT DEFAULT 'confirmed',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (guest_id) REFERENCES guests (id),
        FOREIGN KEY (room_id) REFERENCES rooms (id)
    )`, (err) => {
        if (err) console.error('Error creating bookings table:', err);
        else console.log('Database initialized successfully');
    });

    // Add sample data if tables are empty
    setTimeout(() => {
        addSampleData();
    }, 1000);
};

const addSampleData = () => {
    // Check if rooms table is empty
    db.get("SELECT COUNT(*) as count FROM rooms", (err, row) => {
        if (err) return;
        
        if (row.count === 0) {
            // Add sample rooms
            const sampleRooms = [
                ['Standard', 100, 'Comfortable standard room with basic amenities'],
                ['Deluxe', 150, 'Spacious deluxe room with premium amenities'],
                ['Suite', 250, 'Luxurious suite with separate living area']
            ];
            
            sampleRooms.forEach(room => {
                db.run("INSERT INTO rooms (category, price_per_night, description) VALUES (?, ?, ?)", room);
            });
            console.log('Sample rooms added');
        }
    });
};

module.exports = { initDatabase };
