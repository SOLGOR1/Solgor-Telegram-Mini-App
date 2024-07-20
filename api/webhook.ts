// pages/api/webhook.js

export default async function handler(req, res) {
    if (req.method === 'POST') {
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
          // await saveUserData(id, first_name, username);
        }
  
        // Sende eine erfolgreiche Antwort zurück
        res.status(200).json({ status: 'success' });
      } catch (error) {
        console.error('Error processing webhook:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
      }
    } else {
      // Wenn nicht POST, dann 405 Fehler
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  