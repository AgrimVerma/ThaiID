import React, { useState } from 'react';
import axios from 'axios';

const GetID = () => {
  const [idInput, setIdInput] = useState('');
  const [fetchResult, setFetchResult] = useState(null);

  const handleIdInputChange = (e) => {
    setIdInput(e.target.value);
  };

  const handleFetchOcrData = async () => {
    try {
      const {response} = await axios.get(`http://localhost:8000/api/ocr/${idInput}`);
      setFetchResult(response);
    } catch (error) {
      console.error('Error fetching OCR data:', error.message);
    }
  };

  return (
    <div>
      <h2>Fetch OCR Data</h2>
      <label>Enter OCR ID: </label>
      <input type="text" value={idInput} onChange={handleIdInputChange} />
      <button onClick={handleFetchOcrData}>Fetch OCR Data</button>
      {
        fetchResult && 
        <pre>{JSON.stringify(fetchResult)}</pre>
      }
    </div>
  );
};

export default GetID;
