import React, { useState } from 'react';
import axios from 'axios';

import { Alert } from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';

const DeleteID = () => {
  const [idInput, setIdInput] = useState('');
  const [deleteResult, setDeleteResult] = useState('');

  const handleIdInputChange = (e) => {
    setIdInput(e.target.value);
  };

  const handleDeleteOcrData = async () => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/ocr/${idInput}`);
      setDeleteResult(response.data);
    } catch (error) {
      console.error('Error deleting OCR data:', error.message);
    }
  };

  return (
    <Box justifyContent="center" alignItems="center">
      <Toolbar />
        <FormControl>
          <Typography variant="h4" noWrap component="div">
            Delete OCR Data
            </Typography>
        <FormLabel>Enter OCR ID: </FormLabel>
        <TextField id="filled-basic" label="Filled" variant="filled" value={idInput} onChange={handleIdInputChange}/>
        <Button variant="contained" onClick={handleDeleteOcrData}>Delete OCR Data</Button>
        <pre>{JSON.stringify(deleteResult)}</pre>
        </FormControl>
    </Box>
  );
};

export default DeleteID;
