const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

db.all('SELECT * FROM users', (err, rows) => {
  if (err) console.error('Error:', err.message);
  else console.table(rows); 
  db.close();
});
