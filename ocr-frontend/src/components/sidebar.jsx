import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';

import { Divider, Drawer } from '@mui/material';

const urls = ['/ocr', '/ocr/upload', '/ocr/update', '/ocr/delete'];
const SideBar = () => (
  <Drawer
        variant="permanent"
        sx={{
          width: `18%`,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: `18%`, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
        <Divider />
          <List>
            {['OCR Data', 'Create OCR Data', 'Update OCR Data', 'Delete OCR Data'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                <Link to={urls[index]}>
                  <ListItemText primary={text} /></Link>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        <Divider />
        </Box>
      </Drawer>
);

export default SideBar;