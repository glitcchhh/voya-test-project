const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite DB
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) console.error('DB Connection Error:', err.message);
  else console.log('Connected to SQLite database.');
});

// Print all bookings
db.all('SELECT * FROM bookings', [], (err, rows) => {
  if (err) {
    console.error('Error fetching bookings:', err);
  } else if (rows.length === 0) {
    console.log('No bookings found.');
  } else {
    console.log('All bookings in DB:');
    console.table(rows);
  }

  db.close();
});
