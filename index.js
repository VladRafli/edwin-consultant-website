const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 80;

app.use(express.json());
app.use('/en', express.static(path.join(__dirname, './view/en')));
app.use('/id', express.static(path.join(__dirname, './view/id')));
app.use(cors());

/**
 * Because we don't have something to detect user nationality
 * So we redirect all user to english page
 */
app.get('/', (req, res) => {
    res.redirect('/en');
});

app.listen(PORT, console.log(`Server is running on http://localhost or 127.0.0.1`));