const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

app.use(cors({ origin: '*', methods: ['GET','POST'], allowedHeaders: ['Content-Type'] }));
app.use(bodyParser.json());

// Connect DB
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) console.error('DB Connection Error:', err.message);
  else console.log('Connected to SQLite database.');
});

// Create tables if not exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      propertyName TEXT NOT NULL,
      location TEXT NOT NULL,
      price REAL NOT NULL,
      startDate TEXT NOT NULL,
      endDate TEXT NOT NULL,
      cardNumber TEXT NOT NULL,
      status TEXT NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id)
    )
  `);
});

// Test route
app.get('/', (req, res) => res.send('Hello from backend!'));

// Register user
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.status(400).json({ error: 'All fields are required' });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const stmt = db.prepare('INSERT INTO users (username,email,password) VALUES (?,?,?)');

    stmt.run(username, email, hashedPassword, function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint')) return res.status(400).json({ error: 'Email already exists' });
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID, username, email });
    });

    stmt.finalize();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login user
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ error: 'Invalid email or password' });

    res.json({ message: 'Login successful', user: { id: user.id, username: user.username, email: user.email } });
  });
});

// Get user by id
app.get('/user/:id', (req, res) => {
  db.get('SELECT id, username, email FROM users WHERE id=?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'User not found' });
    res.json(row);
  });
});

// Create a booking with user existence check and logs
app.post('/booking', (req, res) => {
  const { userId, propertyName, location, price, startDate, endDate, cardNumber, status } = req.body;

  if (!userId || !propertyName || !location || !price || !startDate || !endDate || !cardNumber || !status) {
    return res.status(400).json({ error: 'All booking fields are required' });
  }

  console.log('Booking request received:', req.body);

  // Checking if user exists 
  db.get('SELECT id FROM users WHERE id = ?', [userId], (err, user) => {
    if (err) {
      console.error('User check error:', err);
      return res.status(500).json({ error: 'Database error during user validation' });
    }

    if (!user) {
      console.warn('Booking attempt with non-existent userId:', userId);
      return res.status(400).json({ error: 'User not found' });
    }

    // Insert booking now
    const stmt = db.prepare('INSERT INTO bookings (userId, propertyName, location, price, startDate, endDate, cardNumber,status) VALUES (?,?,?,?,?,?,?,?)');
    stmt.run(userId, propertyName, location, price, startDate, endDate, cardNumber,status, function(err) {
      if (err) {
        console.error('Booking insert error:', err);
        return res.status(500).json({ error: err.message });
      }
      console.log('Booking inserted with id:', this.lastID);
      res.json({ bookingId: this.lastID, userId, propertyName, location, price, startDate, endDate,status });
    });
    stmt.finalize();
  });
});

// Get bookings for a user
app.get('/bookings/:userId', (req, res) => {
  db.all('SELECT * FROM bookings WHERE userId = ?', [req.params.userId], (err, rows) => {
    if (err) {
      console.error('Booking query error:', err);
      return res.status(500).json({ error: err.message });
    }
    console.log('Retrieved bookings:', rows);
    res.json(rows);
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
