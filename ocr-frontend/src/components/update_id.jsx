import React, { useState } from 'react';
import axios from 'axios';

import { Alert } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';

function UpdateID() {
  const [idInput, setIdInput] = useState('');
  const [updatedDataInput, setUpdatedDataInput] = useState('');
  const [updatedResult, setUpdatedResult] = useState('');

  const handleIdInputChange = (e) => {
    setIdInput(e.target.value);
  };

  const handleUpdatedDataInputChange = (e) => {
    setUpdatedDataInput(e.target.value);
  };

  const handleUpdateOcrData = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/ocr/${idInput}`, {
        updatedData: JSON.parse(updatedDataInput),
      });
      setUpdatedResult(response.data);
    } catch (error) {
      console.error('Error updating OCR data:', error.message);
    }
  };

  return (
    <Box >
      <Toolbar />
      <FormControl>
      <Typography variant="h4" noWrap component="div"> Upload OCR Data </Typography>
      <FormLabel>Enter OCR ID: </FormLabel>
      <TextField id="filled-basic" label="Filled" variant="filled" type="text" value={idInput} onChange={handleIdInputChange}/>
      <FormLabel>Enter Updated Data: </FormLabel>
      <TextField  variant="filled" type="text" value={updatedDataInput} onChange={handleUpdatedDataInputChange}/>
      <Button variant="contained" onClick={handleUpdateOcrData}>Update OCR Data</Button>
      <pre>{JSON.stringify(updatedResult)}</pre>
      </FormControl>
    </Box>
  );
}

export default UpdateID;
