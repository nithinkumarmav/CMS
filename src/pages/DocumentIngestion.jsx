import React, { useState } from 'react';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import CloseIcon from '@mui/icons-material/Close';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import Sidebar from '../components/Sidebar';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';
import '../css/documentIngestion.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../utils/constants';
const DocumentIngestion = () => {
  const [contractType, setContractType] = useState('-- Select Contract Type --');
  const [productGroup, setProductGroup] = useState('-- Select Product Type --');
  const [contractCategory, setContractCategory] = useState('-- Select Contract Category --');
  const [counterPartyName, setCounterPartyName] = useState('-- Select Counter Party Name --');
  // const [documentType, setDocumentType] = useState('--Select Document Type--');
  // const [contractId, setContractId] = useState('');
  // const [currentDocumentVersion, setCurrentDocumentVersion] = useState('1');
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileData, setFileData] = useState(null); // State to hold the file data
  const [allData, setAllData] = useState(null); // State to hold the file data
  const navigate = useNavigate();
  // Popup State
  const [open, setOpen] = useState(false);

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      setSelectedFile(files[0].name);
      setFileData(files[0]); // Save the file data
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      setSelectedFile(files[0].name);
      setFileData(files[0]); // Save the file data
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDropdownChange = (setter, value) => () => {
    setter(value);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFileData(null); 
  };

  const handleSave = async () => {
    if (!contractType || !productGroup || !contractCategory || !counterPartyName || !fileData) {
      console.error('All fields are required');
      return;
    }
  
    let data = {
      contractType,
      productGroup,
      contractCategory,
      counterPartyName,
      // documentType,
      // contractId,
      // currentDocumentVersion,
      file: fileData,
    };
    
    setAllData(data)
    console.log(data);

    setOpen(true);
  };

  async function handleFinalSave() {
   console.log(allData);
   
    try {
        const response = await axios.post(`${API_BASE_URL}/data_Ingest`, allData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type as multipart/form-data
        },
      });
  
      if (response.status===200) {
        console.log('Success:', response);
        navigate('/chat-box')
      } else {
        console.error('Error:', response.statusText, response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setOpen(false);
    setSelectedFile(null);
    setFileData(null);
    setAllData(null)
  }

  // Handle closing of the popup
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="document-ingestion-container">
      <Sidebar />
      <div className="contract-form">
        <h4>Document Ingestion</h4>
        <div className="row">
          <div className="input-box">
            <label>Contract Type</label>
            <div className="simple-dropdown">
              <div className="dropdown-selected">{contractType}</div>
              <ul className="dropdown-options">
                <li onClick={handleDropdownChange(setContractType, 'Standard clause')}>Standard clause</li>
                <li onClick={handleDropdownChange(setContractType, 'Non-standard clause')}>Non-standard clause</li>
              </ul>
            </div>
          </div>

          <div className="input-box">
            <label>Product Group</label>
            <div className="simple-dropdown">
              <div className="dropdown-selected">{productGroup}</div>
              <ul className="dropdown-options">
                <li onClick={handleDropdownChange(setProductGroup, 'APG')}>APG</li>
                <li onClick={handleDropdownChange(setProductGroup, 'IPG')}>IPG</li>
              </ul>
            </div>
          </div>

          <div className="input-box">
            <label>Contract Categories</label>
            <div className="simple-dropdown">
              <div className="dropdown-selected">{contractCategory}</div>
              <ul className="dropdown-options">
                <li onClick={handleDropdownChange(setContractCategory, 'Customer Agreement')}>Customer Agreement</li>
                <li onClick={handleDropdownChange(setContractCategory, 'Seller Agreement')}>Seller Agreement</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="input-box">
            <label>Counter Party Name</label>
            <div className="simple-dropdown">
              <div className="dropdown-selected">{counterPartyName}</div>
              <ul className="dropdown-options">
                <li onClick={handleDropdownChange(setCounterPartyName, 'FORD MOTOR COMPANY')}>FORD MOTOR COMPANY</li>
                <li onClick={handleDropdownChange(setCounterPartyName, 'D2UX')}>D2UX</li>
              </ul>
            </div>
          </div>
        </div>

        {!selectedFile ? (
          <div
            className={`upload-container ${isDragging ? 'dragging' : ''}`}
            onClick={() => document.getElementById('file-input').click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <DriveFolderUploadIcon className="upload-icon" />
            <p>Upload Your Document</p>
            <small>(Docs, PDF, Word)</small>
            <input
              id="file-input"
              type="file"
              accept=".doc,.docx,.pdf," 
              style={{ display: 'none' }} 
              onChange={handleFileChange}
            />
          </div>
        ) : null}

        {selectedFile && (
          <div>
            <div className="selected-file-display">
              <DocumentScannerIcon className="file-icon" />
              <span className="file-name">{selectedFile}</span>
              <CloseIcon className="remove-file-icon" onClick={handleRemoveFile} />
            </div>
            <button className="save-button" onClick={handleSave}>
              Save
            </button>
          </div>
        )}

        {/* Dialog Popup for showing the saved data */}
        <Dialog open={open} onClose={handleClose}>
  <DialogTitle>Manage Documents</DialogTitle>
  <DialogContent>
    <div className="contract-field-container">     
      <div className="contract-field">
        <Typography className="contract-field-label">Contract Type:</Typography>
        <Typography className="contract-field-value">{contractType}</Typography>
      </div>
      
      <div className="contract-field">
        <Typography className="contract-field-label">Product Group:</Typography>
        <Typography className="contract-field-value">{productGroup}</Typography>
      </div>
      
      <div className="contract-field">
        <Typography className="contract-field-label">Contract Categories:</Typography>
        <Typography className="contract-field-value">{contractCategory}</Typography>
      </div>
      
      <div className="contract-field">
        <Typography className="contract-field-label">Counter Party Name:</Typography>
        <Typography className="contract-field-value">{counterPartyName}</Typography>
      </div>
      
      <div className="contract-field">
        <Typography className="contract-field-label">Uploaded File:</Typography>
        <Typography className="uploaded-file">
          <DocumentScannerIcon className="file-icon" /> {selectedFile}
        </Typography>
      </div>
    </div>
  </DialogContent>
          <DialogActions>
    <button className="save-button" onClick={handleFinalSave}>Save</button>
  </DialogActions>
</Dialog>

      </div>
    </div>
  );
};

export default DocumentIngestion;
