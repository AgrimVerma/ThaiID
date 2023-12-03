const express = require('express');
const router = express.Router();
const ocrController = require('../controllers/ocrController');
const multer = require('multer');

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

router.post('/ocr', upload.single('image'), ocrController.processOCR);

module.exports = router;
