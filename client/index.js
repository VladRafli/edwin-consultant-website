const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const nodemailer = require('nodemailer');
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
    res.header('Pragma', 'no-cache');
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
});

/**
 * Route for Sending Email
 * 
 * ! This route is disabled for now
 * * The reason is we don't have email for send from website to owner
 * * Still not tested
 */
app.post('/email', (req, res) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    })
    transporter.sendMail({
        from: `\"Edwin Consultant\" <${process.env.EMAIL_USERNAME}@gmail.com>`,
        to: process.env.EMAIL_DEST,
        subject: req.body.subject,
        html: `
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8">
                    <style>
                        .warning-msg {
                            padding: 1em;
                            border: 1px solid red;
                        }
                    </style>
                </head>
                <body>
                    <div class="warning-msg">
                        <p style="color:orange;">Perhatian! Jika terdapat sebuah link tercantum pada body email ini, mohon untuk tidak mengklik-nya untuk tindakan keamanan!</p>
                    </div>
                    <div class="content">
                        <p>Nama: ${req.body.content.name}</p>
                        <p>Nomor Telepon: ${req.body.content.phone}</p>
                        <p>Perusahaan: ${req.body.content.company}</p>
                        <p>Jabatan: ${req.body.content.position}</p>
                        <p>Email: ${req.body.content.email}</p>
                        <p>Pesan: <br> ${req.body.content.message}</p>
                    </div>
                </body>
            </html>
            ${req.body.content}
        `
    }, (err, data) => {
        if (err) {
            console.log('Error on sending email:', err);
            res.status(500).send({ msg: 'Error on sending email', reason: err });
        } else {
            console.log('Email sent successfully');
            res.status(200).send({ msg: 'Email send successfully' });
        }
    })
});

app.listen(PORT, console.log(`Server is running on http://localhost:${PORT} or 127.0.0.1:${PORT}`));