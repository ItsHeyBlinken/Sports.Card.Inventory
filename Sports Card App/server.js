

// server.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Bnasty2215!',
  database: 'sports_card_inventory',
  insecureAuth: true,
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Endpoint to add a card to the database
app.post('/addCard', (req, res) => {
  const { set_name, year, card_number, player_name } = req.body;

  // Check if all required fields are provided
  if (!set_name || !year || !card_number || !player_name) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Insert the card into the database
  const sql = 'INSERT INTO cards (set_name, year, card_number, player_name) VALUES (?, ?, ?, ?)';
  db.query(sql, [set_name, year, card_number, player_name], (err, result) => {
    if (err) {
      console.error('Error adding card:', err);
      return res.status(500).json({ error: 'Error adding card to the database' });
    }
    return res.status(200).json({ message: 'Card added successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
