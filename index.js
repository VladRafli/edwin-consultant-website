const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 80;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));
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
    res.header('Cache-Control', 'max-age=0, no-cache, no-store, must-revalidate');
    res.header('Expires', 'Thu, 01 Jan 1970 00:00:00 GMT');
    res.header('Pragma', 'no-cache');
    res.header('Content-Type', 'text/html; charset=utf-8');
    res.status(200).sendFile(path.join(__dirname, '/src/redirect.html'));
});
/**
 * Route for English Pages
 */
app.get('/en', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/en/index.html'));
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
            res.sendFile(path.join(__dirname, '/src/en/form-en.html'));
        } else {
            if ((pid.search('window') !== -1 || pid.search('alert') !== -1 || pid.search('document') !== -1) === true) {
                res.status(403).send(`
                    <h1>403 - Forbidden</h1>
                    <p>You trying to do something illegal</p>
                    <code>${pid}</code>
                `);
            } else {
                res.sendFile(path.join(__dirname, '/src/en/form-en.html'));
            }
        }
    }
});

/**
 * Route for Indonesia Pages
 */
app.get('/id', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/id/index.html'));
});

app.get('/id/contact', (req, res) => {
    const pid = req.query.pid;
    console.log(`PID = '${pid}'\nType = ${typeof pid}\n`);
    if (typeof pid !== 'string' && typeof pid !== 'undefined') {
        res.status(400).send(`
            <h1>400 - Bad Request</h1>
            <p>Something wrong in your request to the server</p>
        `);
    } else {
        if (pid === undefined || pid === '') {
            res.sendFile(path.join(__dirname, '/src/id/form-id.html'));
        } else {
            if ((pid.search('window') !== -1 || pid.search('alert') !== -1 || pid.search('document') !== -1) === true) {
                res.status(403).send(`
                    <h1>403 - Forbidden</h1>
                    <p>You trying to do something illegal</p>
                    <code>${pid}</code>
                `);
            } else {
                res.sendFile(path.join(__dirname, '/src/id/form-id.html'));
            }
        }
    }
});

/**
 * Route for Sending Email
 */
app.post('/email', (req, res) => {
    console.log(req.body);
    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVICE_HOST,
        port: process.env.EMAIL_SERVICE_PORT,
        secure: true,
        tls: {
            servername: 'edwinconsultant.com'
        },
        auth: {
            type: 'login',
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    let transporter_dev = nodemailer.createTransport({
        host: process.env.EMAIL_SERVICE_HOST,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    if (process.env.NODE_ENV === 'development') {
        transporter_dev.verify((err, success) => {
            if (err) {
                console.log('Error on verifying SMTP connection:', err);
                res.status(500).send({ msg: `Error on verifying SMTP connection: ${err}` });
                return;
            } else {
                console.log('Server is ready to take our messages');
            }
        });
        transporter_dev.sendMail({
            from: `\"Edwin Consultant\" <${process.env.EMAIL_USERNAME}>`,
            to: process.env.EMAIL_DEST,
            cc: `${process.env.EMAIL_CC}`,
            subject: req.body.subject,
            html: `
                <!DOCTYPE html>
                <html>
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <style>
                            .warning-msg {
                                padding: 1rem;
                                border: 2px solid red;
                                background-color: rgba(255, 165, 0, .5);
                                font-size: 1.1rem;
                                font-weight: bold;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="warning-msg">
                            <p>Perhatian! Jika terdapat sebuah link tercantum pada body email ini, mohon untuk tidak mengklik-nya sebagai tindakan keamanan!</p>
                        </div>
                        <h1>${req.body.subject}</h1>
                        <div class="content">
                            <h2>Detail:</h2>
                            <p>Nama: ${req.body.content.name}</p>
                            <p>Nomor Telepon: ${req.body.content.phone}</p>
                            <p>Perusahaan: ${req.body.content.company}</p>
                            <p>Jabatan: ${req.body.content.position}</p>
                            <p>Email: ${req.body.content.email}</p>
                            <p>Pesan: ${req.body.content.message}</p>
                        </div>
                    </body>
                </html>
            `
        }, (err, data) => {
            if (err) {
                console.log('Error on sending email:', err);
                res.status(500).send({ msg: 'Error on sending email', reason: err });
            } else {
                console.log('Email sent successfully');
                res.status(200).send({ msg: 'Email send successfully' });
            }
        });
    } else if (process.env.NODE_ENV === 'production') {
        transporter.verify((err, success) => {
            if (err) {
                console.log('Error on verifying SMTP connection:', err);
                res.status(500).send({ msg: `Error on verifying SMTP connection: ${err}` });
                return;
            } else {
                console.log('Server is ready to take our messages');
            }
        });
        transporter.sendMail({
            from: `\"Edwin Consultant\" <${process.env.EMAIL_USERNAME}>`,
            to: process.env.EMAIL_DEST,
            cc: `${process.env.EMAIL_CC}`,
            subject: req.body.subject,
            html: `
                <!DOCTYPE html>
                <html>
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <style>
                            .warning-msg {
                                padding: 1rem;
                                border: 2px solid red;
                                background-color: rgba(255, 165, 0, .5);
                                font-size: 1.1rem;
                                font-weight: bold;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="warning-msg">
                            <p>Perhatian! Jika terdapat sebuah link tercantum pada body email ini, mohon untuk tidak mengklik-nya sebagai tindakan keamanan!</p>
                        </div>
                        <h1>${req.body.subject}</h1>
                        <div class="content">
                            <h2>Detail:</h2>
                            <p>Nama: ${req.body.content.name}</p>
                            <p>Nomor Telepon: ${req.body.content.phone}</p>
                            <p>Perusahaan: ${req.body.content.company}</p>
                            <p>Jabatan: ${req.body.content.position}</p>
                            <p>Email: ${req.body.content.email}</p>
                            <p>Pesan: ${req.body.content.message}</p>
                        </div>
                    </body>
                </html>
            `
        }, (err, data) => {
            if (err) {
                console.log('Error on sending email:', err);
                res.status(500).send({ msg: 'Error on sending email', reason: err });
            } else {
                console.log('Email sent successfully');
                res.status(200).send({ msg: 'Email send successfully' });
            }
        });
    }
});

app.listen(PORT, console.log(`Server is running on http://localhost:${PORT} or 127.0.0.1:${PORT}`));