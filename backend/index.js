const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

app.use(cors({ origin: '*', methods: ['GET','POST'], allowedHeaders: ['Content-Type'] }));


app.use(bodyParser.json());

const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) console.error('DB Connection Error:', err.message);
  else console.log('Connected to SQLite database.');
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )`);
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

app.get('/user/:id', (req,res) => {
  db.get('SELECT id, username, email FROM users WHERE id=?', [req.params.id], (err,row) => {
    if(err) return res.status(500).json({ error: err.message });
    if(!row) return res.status(404).json({ error: 'User not found' });
    res.json(row);
  });
});


// Start server
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
