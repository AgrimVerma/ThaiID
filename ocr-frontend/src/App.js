import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SideBar from './components/sidebar';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';

import UploadID from './components/upload_id';
import UpdateID from './components/update_id';
import DeleteID from './components/delete_id';
import GetID from './components/get_id';


function App() {
  return (
    <Box sx={{ width: 1, height: 1 }}>

      <Box>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ paddingRight: 1 }}>
            ThaiID
          </Typography> 
          <ContactEmergencyIcon />
        </Toolbar>
      </AppBar>
      </Box>

      <Box>
          <SideBar />
          <Box sx={{ paddingTop: `5%`, paddingLeft: `25%` }}>
          <Routes>
            <Route path="/ocr" element={<GetID />} />
            <Route path="/ocr/upload" element={<UploadID />} />
            <Route path="/ocr/update" element={<UpdateID />} />
            <Route path="/ocr/delete" element={<DeleteID />} />
          </Routes>
          </Box>
      </Box>






    </Box>
  );
}

export default App;
