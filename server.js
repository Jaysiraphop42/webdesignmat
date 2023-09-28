const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2'); 
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your-mysql-password',
  database: 'mydb', 
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/build')));

app.post('/submit-order', (req, res) => {
  const orderData = req.body;
  console.log('Received order data:', orderData);

  db.query('INSERT INTO orders SET ?', orderData, (err, result) => {
    if (err) {
      console.error('Error inserting order data into MySQL:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Order received successfully and inserted into MySQL');
      res.send('Order received successfully');
    }
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
