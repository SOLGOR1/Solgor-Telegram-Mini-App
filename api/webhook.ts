// pages/api/webhook.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
      // Hier kannst du die Daten verarbeiten
      console.log('Received webhook:', req.body);
  
      // Sende eine erfolgreiche Antwort zurück
      res.status(200).json({ status: 'success' });
    } else {
      // Wenn nicht POST, dann 405 Fehler
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }