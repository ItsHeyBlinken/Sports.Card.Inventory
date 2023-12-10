

// server.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_username', // replace with your MySQL username
  password: 'your_password', // replace with your MySQL password
  database: 'sports_card_inventory',
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Your API endpoints will be added here
// Add a card
app.post('/addCard', (req, res) => {
    const { set_name, year, card_number, player_name } = req.body;
    const sql = 'INSERT INTO cards (set_name, year, card_number, player_name) VALUES (?, ?, ?, ?)';
  
    db.query(sql, [set_name, year, card_number, player_name], (err, result) => {
      if (err) {
        console.error('Error adding card:', err);
        res.status(500).json({ error: 'Error adding card' });
        return;
      }
      res.status(200).json({ message: 'Card added successfully' });
    });
  });
  
  // Get all cards with optional search
  app.get('/getCards', (req, res) => {
    const searchQuery = req.query.search || '';
    const sql = 'SELECT * FROM cards WHERE set_name LIKE ? OR player_name LIKE ?';
  
    db.query(sql, [`%${searchQuery}%`, `%${searchQuery}%`], (err, results) => {
      if (err) {
        console.error('Error retrieving cards:', err);
        res.status(500).json({ error: 'Error retrieving cards' });
        return;
      }
      res.status(200).json(results);
    });
  });

// 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
