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
 * Default language is English
 * But we save user language preference in their localStorage 
 * And no caching because we want to redirect user to somewhere else
 */
app.get('/', (req, res) => {
    res.header('Cache-control', 'max-age=0, no-cache, no-store, must-revalidate');
    res.header('Expires', 'Thu, 01 Jan 1970 00:00:00 GMT');
    res.header('Pramga', 'no-cache');
    res.sendFile(path.join(__dirname, '/src/redirect.html'));
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