const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const ocrRoutes = require('./routes/ocrRoutes');

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Hello from server side');
});


app.use('/api', ocrRoutes);

const port = 8000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
