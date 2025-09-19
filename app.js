const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { initDatabase } = require('./models/initDB');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize database
initDatabase();

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.use('/rooms', require('./routes/rooms'));
app.use('/guests', require('./routes/guests'));
app.use('/bookings', require('./routes/bookings'));

// Home page
app.get('/', (req, res) => {
    res.render('index');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
```__
