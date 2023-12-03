const express = require('express');
const fs = require('fs');
const path = require('path');
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

function formatDate(dateString) {
    const months = {
        'Jan.': '01', 'Feb.': '02', 'Mar.': '03', 'Apr.': '04',
        'May': '05', 'Jun.': '06', 'Jul.': '07', 'Aug.': '08',
        'Sep.': '09', 'Oct.': '10', 'Nov.': '11', 'Dec.': '12'
    };
    const parts = dateString.split(' ');
    const day = parts[0];
    const month = months[parts[1]];
    const year = parts[2];
    return `${day}/${month}/${year}`;
}
  
const upload = multer({ storage: storage });
const outputDir = './output';

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
      console.log(detections)

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
                idInfo.date_of_birth = formatDate(line.split('Date of Birth')[1].trim());
            } else if (line.toLowerCase().includes('Date of Issue'.toLowerCase())) {
                idInfo.date_of_issue = formatDate(lines[lines.indexOf(line) - 1].trim());
            } else if (line.toLowerCase().includes('Date of Expiry'.toLowerCase())) {
                idInfo.date_of_expiry = formatDate(lines[lines.indexOf(line) - 1].trim());
            }
        });
        console.log(idInfo);

        const file_name = idInfo.identification_number;
        if(!file_name) {
            return res.status(400).send('Identification number not found in OCR data.');
        }
        // Define output file path
        const outputFilePath = path.join(outputDir, `${file_name}.json`);

        // Check if the file already exists
        if (fs.existsSync(outputFilePath)) {
            return res.status(409).send(`A file with identification number ${file_name} already exists.`);
        }

        // Write OCR data to file
        fs.writeFile(outputFilePath, JSON.stringify(idInfo, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error writing file');
            }
            res.status(200).send(`OCR data saved to ${outputFilePath}`);
        });
    } 
    catch (error) {
      console.error(error);
      res.status(500).send('Error processing the image');
    }
  });  

const port = 8000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

