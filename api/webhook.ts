// api/webhook.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
      console.log('Received webhook:', req.body); // Zum Debuggen
      res.status(200).json({ status: 'success' });
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }