const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 80;

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());

/**
 * Set public folder to Static
 * So files that need static files can access it
 */
app.use(express.static(path.join(__dirname, '/public')));
/**
 * Because we don't have something to detect user nationality
 * So we redirect all user to english page
 */
app.get('/', (req, res) => {
    res.redirect('/en');
});
/**
 * Route for English Pages
 */
app.get('/en', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/index.html'));
});

app.get('/en/contact', (req, res) => {
    const pid = req.query.pid;
    console.log(`PID = '${pid}'\nType = ${typeof pid}\n`);
    if (typeof pid !== 'string' && typeof pid !== 'undefined') {
        res.status(400).send(`
            <h1>400 - Bad Request</h1>
            <p>Something wrong in your request to the server</p>
        `);
    } else {
        if (pid === undefined || pid === '') {
            res.sendFile(path.join(__dirname, '/src/form.html'));
        } else {
            if ((pid.search('window') !== -1 || pid.search('alert') !== -1 || pid.search('document') !== -1) === true) {
                res.status(403).send(`
                    <h1>403 - Forbidden</h1>
                    <p>You trying to do something illegal</p>
                    <code>${pid}</code>
                `);
            } else {
                res.sendFile(path.join(__dirname, '/src/form.html'));
            }
        }
    }
});

/**
 * Route for Indonesia Pages
 */

app.get('/id', (req, res) => {
    res.status(404).send(`
        <h1>404 - Not Found</h1>
        <p>Sorry, Indonesian page is still not generated for the moment</p>
    `);
})

app.listen(PORT, console.log(`Server is running on http://localhost or 127.0.0.1`));