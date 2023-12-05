import React, { useState } from 'react';
import axios from 'axios';

const UploadID = () => {
  const [file, setFile] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadOcrData = async () => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post('http://localhost:8000/api/ocr', formData);
      setUploadResult(response.data);
    } catch (error) {
      console.error('Error uploading OCR data:', error.message);
    }
  };

  return (
    <div>
      <h2>Upload OCR Data</h2>
      <label>Select Image: </label>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUploadOcrData}>Upload OCR Data</button>
      <div>
        {uploadResult && <pre>{uploadResult}</pre>}
      </div>
    </div>
  );
};

export default UploadID;
