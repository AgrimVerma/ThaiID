import React, { useState } from 'react';
import axios from 'axios';

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
    <div>
      <h2>Update OCR Data</h2>
      <label>Enter OCR ID: </label>
      <input type="text" value={idInput} onChange={handleIdInputChange} />
      <label>Enter Updated Data: </label>
      <textarea value={updatedDataInput} onChange={handleUpdatedDataInputChange}></textarea>
      <button onClick={handleUpdateOcrData}>Update OCR Data</button>
      {updatedResult && <pre>{updatedResult}</pre>}
    </div>
  );
}

export default UpdateID;
