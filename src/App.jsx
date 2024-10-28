import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import "./index.css"
import DocumentIngestion from './pages/DocumentIngestion';
import Signup from './pages/Signup';
import Workflow from './pages/Workflow';
import DigitalLibrary from './pages/DigitalLibrary';
import ChatBox from './pages/ChatBox';
import DocumentUpload from './Demo/DocumentUpload';
import DemoDashboard from './Demo/DemoDashboard';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/document-ingestion" element={<DocumentIngestion />} />
      <Route path="/workflow" element={<Workflow />} />
      <Route path="/digital-library" element={<DigitalLibrary />} />
      <Route path="/chat-box" element={<ChatBox />} />
      <Route path="/upload-doc" element={<DocumentUpload />} />
      <Route path="/demo-dashboard" element={<DemoDashboard />} />
    </Routes>
  );
}

export default App;
