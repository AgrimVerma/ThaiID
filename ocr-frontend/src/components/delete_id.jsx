import React, { useState } from 'react';
import axios from 'axios';

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
    <div>
      <h2>Delete OCR Data</h2>
      <label>Enter OCR ID: </label>
      <input type="text" value={idInput} onChange={handleIdInputChange} />
      <button onClick={handleDeleteOcrData}>Delete OCR Data</button>
      {deleteResult && <pre>{deleteResult}</pre>}
    </div>
  );
};

export default DeleteID;
