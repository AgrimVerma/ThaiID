const express = require('express');
const fs = require('fs');
const dotenv = require('dotenv');

const multer = require('multer');
const vision = require('@google-cloud/vision');

dotenv.config({path: './config.env'});
const jsonFilePath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

// Read the JSON file
fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    const jsonData = JSON.parse(data);
    // console.log(jsonData);
});

// Set up Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')  // 'uploads/' is the folder where files will be saved
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)  // use the original file name
    }
  });
  
const upload = multer({ storage: storage });

const app = express();


// Creates a client
const client = new vision.ImageAnnotatorClient();

app.get('/', (req, res) => {
    res.status(200).send('Hello from server side');
});

app.post('/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
  
    try {
      // Perform OCR on the uploaded image
      const [result] = await client.textDetection(`./uploads/${req.file.originalname}`);
      const detections = result.textAnnotations;

      const text = detections[0].description;

      // Assuming each piece of data is on a new line
      const lines = text.split('\n');

      let idInfo = {
        identification_number: '',
        name: '',
        last_name: '',
        date_of_birth: '',
        date_of_issue: '',
        date_of_expiry: ''
    };

    lines.forEach(line => {
        if (line.startsWith('บัตรประจำตัวประชาชน')) {
            idInfo.identification_number = lines[lines.indexOf(line) + 1].trim();
        } else if (line.includes('Name')) {
            idInfo.name = line.split('Name')[1].trim();
        } else if (line.includes('Last name')) {
            idInfo.last_name = line.split('Last name')[1].trim();
        } else if (line.includes('Date of Birth')) {
            idInfo.date_of_birth = line.split('Date of Birth')[1].trim();
        } else if (line.includes('Date of Issue')) {
            idInfo.date_of_issue = lines[lines.indexOf(line) - 1].trim();
        } else if (line.includes('Date of Expiry')) {
            idInfo.date_of_expiry = lines[lines.indexOf(line) - 1].trim();
        }
    });

      console.log(idInfo);
  
      res.json({ detections });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error processing the image');
    }
  });  

const port = 8000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

