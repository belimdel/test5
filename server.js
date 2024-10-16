const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;



app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {

    const { to, subject, text } = req.body;

    if (!to || !subject || !text) {
        return res.status(400).json({ error: 'Tous les champs sont obligatoires' });
    }

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hmher866@gmail.com',
            pass: 'jtxtoxmjefdcamet'
        }
    });

    let mailOptions = {
        from: 'hmher866@gmail.com',
        to: to,
        subject: subject,
        text: text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erreur lors de l\'envoi de l\'email :', error);
            return res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email' });
        }
        console.log('Email envoyé avec succès :', info.response);
        res.status(200).json({ message: 'Email envoyé avec succès', info });
    });
});

app.listen(PORT, () => {
    console.log(`Le serveur tourne sur http://localhost:${PORT}`);
});
