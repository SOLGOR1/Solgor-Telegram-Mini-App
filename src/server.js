const express = require('express');
const bodyParser = require('body-parser');
const { Firestore } = require('@google-cloud/firestore');
const fetch = require('node-fetch'); // For making API requests to Telegram

const app = express();
const port = process.env.PORT || 3001;

// Initialize Firestore
const firestore = new Firestore();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Webhook Endpoint
app.post('/telegram-webhook', async (req, res) => {
    const message = req.body.message;
    if (message) {
        const chatId = message.chat.id;
        const userName = message.from.username || 'No Name';

        // Save user data to Firestore
        try {
            await firestore.collection('users').doc(chatId.toString()).set({ name: userName });
            res.sendStatus(200);
        } catch (error) {
            console.error('Error saving user data:', error);
            res.sendStatus(500);
        }
    } else {
        res.sendStatus(400); // Bad Request
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
