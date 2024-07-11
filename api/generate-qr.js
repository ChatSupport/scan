const fetch = require('node-fetch');

module.exports = async (req, res) => {
    try {
        const { deviceid } = req.query;

        if (!deviceid) {
            return res.status(400).json({ error: 'Device ID not found in query parameter.' });
        }

        const apiUrl = `https://api.haber.chat/v1/devices/${deviceid}/scan?encoding=base64_uri`;

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer 10758f7794e3fe9e431fadfdc9a0ab8ca54b749e9613868cf33bbe5e2b637b86e82e354dd8c6c80a`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();

        if (responseData && responseData.data) {
            return res.status(200).json({ svg: responseData.data });
        } else {
            throw new Error('Invalid API response');
        }
    } catch (error) {
        console.error('Error fetching or processing QR code:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
