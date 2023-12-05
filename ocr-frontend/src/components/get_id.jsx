import React, { useState } from 'react';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


import Toolbar from '@mui/material/Toolbar';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FormControl, FormLabel } from '@mui/material';

const GetID = () => {
  const [idInput, setIdInput] = useState('');
  const [fetchResult, setFetchResult] = useState('');

  const handleIdInputChange = (e) => {
    setIdInput(e.target.value);
  };

  const handleFetchOcrData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/ocr/${idInput}`);
      setFetchResult(response.data);    
    } catch (error) {
      console.error('Error fetching OCR data:', error.message);
    }
  };

  const notify = () => toast("Wow so easy !");


  return (
    <Box sx={{ width: 1/2 }}>
        <Toolbar />
      <FormControl>
        <Typography variant="h4" noWrap component="div">
           Fetch OCR Data
          </Typography>
      <FormLabel>Enter OCR ID: </FormLabel>
      <TextField id="filled-basic" label="Filled" variant="filled" vtype="text" value={idInput} onChange={handleIdInputChange} />
      <Button variant="contained" onClick={handleFetchOcrData} >Fetch OCR Data</Button>
      <ToastContainer/>
      <pre>{JSON.stringify(fetchResult)}</pre>
      </FormControl>
    </Box>
  );
};

export default GetID;
