// server.js
const express = require('express');
const crypto = require('crypto');
const app = express();

app.get('/auth/telegram', (req, res) => {
    const secret = 'your_bot_token';  // Ersetze dies mit deinem echten Bot-Token
    const hash = req.query.hash;
    const dataCheckString = Object.keys(req.query)
        .filter(key => key !== 'hash')
        .sort()
        .map(key => `${key}=${req.query[key]}`)
        .join('\n');

    const hmac = crypto.createHmac('sha256', secret).update(dataCheckString).digest('hex');

    if (hmac !== hash) {
        return res.status(403).send('Unauthorized');
    }

    // Gültige Anmeldung, sende Benutzerinformationen an die App zurück
    res.json({
        id: req.query.id,
        first_name: req.query.first_name,
        last_name: req.query.last_name,
        username: req.query.username,
        photo_url: req.query.photo_url
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
