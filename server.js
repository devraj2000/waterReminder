const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const PORT = 3000;

// Replace with your Twilio credentials
const accountSid = 'AC33da6682c13b05f7064c572d86a8a605';
const authToken = 'e8d9cbea473c06c1d58f1e31b0aa7389';
const client = twilio(accountSid, authToken);

app.use(bodyParser.json());

app.post('/send-reminder', (req, res) => {
    const { phoneNumber, message } = req.body;

    client.messages
        .create({
            body: message,
            from: '+12317972741',
            to: phoneNumber,
        })
        .then(() => res.json({ success: true }))
        .catch(error => res.json({ success: false, error: error.message }));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
