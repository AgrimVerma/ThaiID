import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => (
    <div>
      <div>
          <ul >
            <li >
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/ocr">OCR Data</Link>
            </li>
            <li>
              <Link to="/ocr/update">Update OCR Data</Link>
            </li>
            <li>
              <Link to="/ocr/delete">Delete OCR Data</Link>
            </li>
            <li>
              <Link to="/ocr/upload">Create OCR Data</Link>
            </li>
          </ul>
        </div>
        </div>
);

export default SideBar;