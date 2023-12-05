import React, { useState } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';

const UploadID = () => {
  const [file, setFile] = useState(null);
  const [uploadResult, setUploadResult] = useState('');
  const [open, setOpen] = React.useState(true);

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
    // <div>
    //   <h2>Upload OCR Data</h2>
    //   <label>Select Image: </label>
    //   <input type="file" onChange={handleFileChange} />
    //   <button onClick={handleUploadOcrData}>Upload OCR Data</button>
    //   <div>
    //     <pre>{JSON.stringify(uploadResult)}</pre>
    //   </div>
    // </div>
        <Box >
        <Toolbar />
        <FormControl>
          <Typography sx={{paddingBottom: 3}} variant="h4" noWrap component="div">
           Upload OCR Data
          </Typography>
        <FormLabel sx={{paddingBottom: 1}}>Select Image: </FormLabel>
        <input type="file" onChange={handleFileChange} />
        <Button sx={{marginTop: 2}} variant="contained" onClick={handleUploadOcrData}>Upload OCR Data</Button>
        <pre> {JSON.stringify(uploadResult)}</pre>
        </FormControl>
      </Box>
  );
};

export default UploadID;
