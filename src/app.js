const express = require('express');
const app = express();
const dotenv = require('dotenv');
const ocrRoutes = require('./routes/ocrRoutes');

dotenv.config({ path: './config.env' });

app.get('/', (req, res) => {
    res.status(200).send('Hello from server side');
});

app.use('/api', ocrRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
