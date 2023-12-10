

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Bnasty2215!', // Use environment variables
  database: 'sports_card_inventory',
  insecureAuth: true,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1); // Exit the application if there's an issue with the database connection
  }
  console.log('Connected to MySQL');
});

// Endpoint to add a card to the database
app.post('/addCard', (req, res) => {
  const { set_name, year, card_number, player_name } = req.body;

  console.log('Received request body:', req.body);

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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
