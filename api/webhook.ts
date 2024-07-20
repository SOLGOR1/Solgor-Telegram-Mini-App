// src/webhook.ts

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import crypto from 'crypto';

// Initialisiere Express
const app = express();
const port = 3000; // Wähle den gewünschten Port

// Middleware
app.use(bodyParser.json());

// Webhook-Handler
app.post('/webhook', (req: Request, res: Response) => {
    try {
        // Verarbeite die Daten, die von Telegram gesendet werden
        const update = req.body;
  
        // Logge die empfangenen Daten für Debugging-Zwecke
        console.log('Received webhook:', update);
  
        // Überprüfe, ob die Update-Daten einen Benutzer enthält
        if (update && update.message && update.message.from) {
            const { id, first_name, username } = update.message.from;
  
            // Logge die Benutzerinformationen für Debugging-Zwecke
            console.log('User ID:', id);
            console.log('First Name:', first_name);
            console.log('Username:', username);
  
            // Hier kannst du die Daten in deiner Datenbank speichern oder weiter verarbeiten
            // Beispiel:
            // const userDocRef = doc(db, 'users', id);
            // await setDoc(userDocRef, { username, first_name }, { merge: true });
        } else {
            console.warn('No user data found in the update');
        }
  
        // Sende eine erfolgreiche Antwort zurück
        res.status(200).json({ status: 'success' });
    } catch (error) {
        console.error('Error processing webhook:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
});

// Starten des Servers
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
