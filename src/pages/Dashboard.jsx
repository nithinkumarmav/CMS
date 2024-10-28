import React from 'react';
import '../css/dashboard.css';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import AiIcon from '@mui/icons-material/Psychology'; // Assuming AI-related icon
import ManualIcon from '@mui/icons-material/CheckCircleOutline';
import ApprovedIcon from '@mui/icons-material/CheckCircle';
import Button from '@mui/material/Button';
import PublishIcon from '@mui/icons-material/Publish';
import Sidebar from '../components/Sidebar';
import uploadPlus from '../assests/icons/uploadPlus.svg';
import AddIcon from '@mui/icons-material/Add';
import AiAgent from '../assests/icons/AIAgent-card.svg';
import manualReview from '../assests/icons/manual-card.svg';
import appproved from '../assests/icons/approved-card.svg';
import downloadIcon from '../assests/icons/download-dashboard.svg';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="dashboard-sidebar-container">
      <Sidebar />
      <div className="dashboard-container">
        <div className="dashboard-grid">
          <div className="card contract-received dashboard-boxes">
            <p className="status">
              Contract Received
            </p>
            <img src={downloadIcon} alt="My SVG" />
            <p className="count" style={{ color: '#FF6000'}}>201 Received</p>
          </div>

          <div className="card ai-agent-review dashboard-boxes">
            <p className="status">AI Agent Review</p>
            <img src={AiAgent} alt="My SVG" />
            {/* <AiIcon style={{ fontSize: 40, color: '#555' }} /> */}
            <p className="count"style={{ color: '#FF0404' }}>12 AI Agent</p>
          </div>

          {/* <img src={uploadPlus} alt="My SVG" className="upload-button" /> */}
          <AddIcon
            className="upload-button"
            style={{ fontSize: '4rem', color: '#ff9100', cursor: 'pointer' }}
            onClick={() => navigate('/document-ingestion')}
          />
          <span className="upload-button">Upload Document</span>

          <div className="card manual-review dashboard-boxes">
            <p className="status">Manual Review</p>
            {/* <ManualIcon style={{ fontSize: 40, color: '#555' }} /> */}
            <img src={manualReview} alt="My SVG" />
            <p className="count"  style={{ color: '#00491e'}}>13 Review</p>
          </div>

          <div className="card approved dashboard-boxes">
            <p className="status">Approved</p>
            {/* <ApprovedIcon style={{ fontSize: 40, color: '#555' }} /> */}
            <img src={appproved} alt="My SVG" />
            <p className="count"  style={{ color: '#695400'}}>13 Approved</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
