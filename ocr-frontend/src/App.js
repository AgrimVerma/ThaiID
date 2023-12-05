import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SideBar from './components/sidebar';

import UploadID from './components/upload_id';
import UpdateID from './components/update_id';
import DeleteID from './components/delete_id';
import GetID from './components/get_id';

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}


function App() {
  return (
    <div >
        <SideBar />
        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/ocr" element={<GetID />} />
            <Route path="/ocr/upload" element={<UploadID />} />
            <Route path="/ocr/update" element={<UpdateID />} />
            <Route path="/ocr/delete" element={<DeleteID />} />
        </Routes>
    </div>
  );
}

export default App;
