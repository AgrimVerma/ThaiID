const OCRData = require('../models/ocrData');
const fs = require('fs');
const db = require('../firebase');

const path = require('path');
const formatDate = require('../utils/formatDate');
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

const outputDir = 'C:/Users/91964/Desktop/ThaiID/output';

exports.getOCRResult = async (req, res) => {
    const id = req.params.id;

    try {
        const doc = await db.collection('ocrData').doc(id).get();
        if (!doc.exists) {
            return res.status(404).send('Document not found');
        }
        res.status(200).json(doc.data());
    } catch (error) {
        res.status(500).send('Error retrieving data from Firestore');
    }
};

exports.updateOCRResult = async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;

    if(id != updatedData.identification_number) {
        res.status(400).send('Identification number do not match!!');
    }

    try {
        await db.collection('ocrData').doc(id).set(updatedData, { merge: true });
        res.status(200).send(`OCR data updated for ID: ${id}`);
    } catch (error) {
        res.status(500).send('Error updating data in Firestore');
    }
};

exports.deleteOCRResult = async (req, res) => {
    const id = req.params.id;

    try {
        await db.collection('ocrData').doc(id).delete();
        res.status(200).send(`Document with ID ${id} deleted`);
    } catch (error) {
        res.status(500).send('Error deleting document from Firestore');
    }
};

exports.createOCR = async (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
  
    
      // Perform OCR on the uploaded image
      const [result] = await client.textDetection(`./uploads/${req.file.originalname}`);
      const detections = result.textAnnotations;

      const text = detections[0].description;

      // Assuming each piece of data is on a new line
      const lines = text.split('\n');

        lines.forEach(line => {
            if (line.startsWith('บัตรประจำตัวประชาชน')) {
                OCRData.identification_number = lines[lines.indexOf(line) + 1].trim();
            } else if (line.includes('Name')) {
                OCRData.name = line.split('Name')[1].trim();
            } else if (line.includes('Last name')) {
                OCRData.last_name = line.split('Last name')[1].trim();
            } else if (line.includes('Date of Birth')) {
                OCRData.date_of_birth = formatDate(line.split('Date of Birth')[1].trim());
            } else if (line.toLowerCase().includes('Date of Issue'.toLowerCase())) {
                OCRData.date_of_issue = formatDate(lines[lines.indexOf(line) - 1].trim());
            } else if (line.toLowerCase().includes('Date of Expiry'.toLowerCase())) {
                OCRData.date_of_expiry = formatDate(lines[lines.indexOf(line) - 1].trim());
            }
        });
        console.log(OCRData);

        const file_name = OCRData.identification_number;

        if(!file_name) {
            return res.status(400).send('Identification number not found in OCR data.');
        }
        // Define output file path
        const outputFilePath = path.join(outputDir, `${file_name}.json`);

        // Check if the file already exists
        if (fs.existsSync(outputFilePath)) {
            return res.status(409).send(`A file with identification number ${file_name} already exists.`);
        }

        try {
            const docRef = await db.collection('ocrData').doc(OCRData.identification_number).set(OCRData);
            res.status(200).send(`OCR data saved with ID: ${OCRData.identification_number}`);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error saving data to Firestore');
        }
  };
