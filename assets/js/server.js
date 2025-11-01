const express = require('express');
const path = require('path');
const app = express();
const data = require('./readFile');

app.use(express.static(path.join(__dirname, '..', '..')));

app.get('/sentence', (req, res) => {
    res.json(data); // send as JSON
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
