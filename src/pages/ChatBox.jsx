import React, { useEffect, useState } from 'react';
import {
  Grid,
  TextField,
  Button,
  Tabs,
  Tab,
  Box,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
  Avatar,
  Collapse
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import axios from 'axios';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import Sidebar from '../components/Sidebar';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import CircularProgress from '@mui/material/CircularProgress';
import { API_BASE_URL } from '../utils/constants';
const ChatBox = () => {
  const [prompt, setPrompt] = useState('');
  const [chats, setChats] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [pdfUrl, setPdfUrl] = useState(null); // Keep null as initial state
  const [metaData, setMetaData] = useState(null); // Keep null as initial state
  const [rawText, setRawText] = useState(null); // Keep null as initial state
  const [loading, setLoading] = useState(true); // Loading state
  const username = 'User';

  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  // Fetch document, metadata, and raw text
  useEffect(() => {
    const getData = async () => {
      console.log("Testing the useEffect function in chat")
      setLoading(true); // Start loading
      try {
        const res = await axios.get(`${API_BASE_URL}/document_view`); // Replace with your API endpoint
        const pdfEndpoint = `${API_BASE_URL}/document_view/pdf`;
        setPdfUrl(pdfEndpoint)
        // const relativePdfPath = res.data.PDF_File.replace(/\\/g, '/'); // Normalize 
        // setPdfUrl(res.data.data); // Set PDF URL
        setMetaData(res.data.meta_data);
        setRawText(res.data.raw_text);
        // console.log(relativePdfPath);
        console.log(res);
        
        
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Stop loading after fetching data
      }
    };
    getData();
  }, []);

  const fetchAIResponse = async (userPrompt) => {
    console.log(userPrompt);
    const formData = new FormData();
    formData.append('prompt', userPrompt);
    try {
      const response = await axios.post(`${API_BASE_URL}/chat_bot`, formData );
      console.log(response.data)
      return response.data.Answer;
    } catch (error) {
      console.error('Error fetching AI response', error);
      // return 'This is a dummy AI response to your question';
    }
  };

  const handleSubmitPrompt = async () => {
    if (prompt.trim() === '') return;

    const userMessage = { sender: username, text: prompt, type: 'user' };
    const aiResponseText = await fetchAIResponse(prompt);
    const aiMessage = {
      sender: 'Contract negotiation AI',
      text: aiResponseText,
      type: 'ai'
    };

    setChats((prevChats) => [...prevChats, userMessage, aiMessage]);
    setPrompt(''); // Clear input field
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const [open, setOpen] = useState(false);
  const collapseText = () => {
    setOpen(!open);
  };
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {/* Loading */}
        <CircularProgress sx={{ color: '#f08030' }} />
      </Box>
    );
  }

  return (
    <Grid container spacing={3} style={{ backgroundColor: '#f5f5f5' }}>
      <Grid item xs={2} md={1.8} style={{ position: 'relative', zIndex: 1 }}>
        <Sidebar />
      </Grid>

      {/* Chat Box Section */}
      <Grid item xs={10} md={4} style={{ padding: '80px 40px 0 40px' }}>
     
        <Paper
          elevation={3}
          style={{
            height: '808px',
            overflowY: 'auto',
            padding: '20px',
            backgroundColor: '#fff',
            position: 'relative'
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              textAlign: 'center'
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              style={{ fontWeight: 'bold', color: '#f08030' }}
            >
              Chat Box
            </Typography>

            <IconButton
            // code for Export chat
            >
              <UpgradeIcon
                style={{ cursor: 'pointer', fontSize: '30px', color: 'black' }}
              />
            </IconButton>
          </div>

          <Typography
            style={{
              display: 'flex',
              justifyContent: 'start',
              padding: '10px 0',
              cursor: 'pointer'
            }}
            onClick={collapseText}
          >
            Recent
            <KeyboardArrowDownOutlinedIcon />
          </Typography>
          <Collapse in={open}>
            <Typography
              variant="span"
              style={{
                display: 'inline-block',
                padding: '5px 8px',
                margin: '0px 8px 0px 0',
                backgroundColor: '#F582204D',
                borderRadius: '10px'
              }}
            >
              Heading of the document{' '}
            </Typography>
            <Typography
              variant="span"
              style={{
                display: 'inline-block',
                padding: '5px 8px',
                margin: '10px 8px 0px 0',
                backgroundColor: '#F582204D',
                borderRadius: '10px'
              }}
            >
              Contract id
            </Typography>
            <Typography
              variant="span"
              style={{
                display: 'inline-block',
                padding: '5px 8px',
                margin: '10px 8px 0px 0',
                backgroundColor: '#F582204D',
                borderRadius: '10px'
              }}
            >
              Heading{' '}
            </Typography>
            <Typography
              variant="span"
              style={{
                display: 'inline-block',
                padding: '5px 8px',
                margin: '10px 8px 0px 0',
                backgroundColor: '#F582204D',
                borderRadius: '10px'
              }}
            >
              Heading of the document{' '}
            </Typography>
          </Collapse>

          {/* Input Field */}
          <TextField
            fullWidth
            placeholder="Enter Your Prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            variant="outlined"
            style={{ margin: '20px 0' }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSubmitPrompt();
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSubmitPrompt} edge="end">
                    <SendIcon style={{ color: '#f08030' }} />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          {/* Display Recent Chats in Chat Format */}
          <Box mb={2} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {chats.map((chat, index) => (
              <Box
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: chat.type === 'user' ? 'row-reverse' : 'row',
                  marginBottom: '12px',
                  alignItems: 'flex-end',
                  gap: '20px'
                }}
              >
                <Avatar>{chat.sender[0]}</Avatar>
                <Box>
                  <Typography
                    style={{
                      fontWeight: 'bold',
                      marginBottom: '2px',
                      textAlign: chat.type === 'user' ? 'right' : 'left',
                      color: '#f08030'
                    }}
                  >
                    {chat.sender}
                  </Typography>
                  <Typography
                    style={{
                      backgroundColor: chat.type === 'user' ? '#e0f7fa' : '#f5f5f5',
                      padding: '10px',
                      borderRadius: '10px',
                      maxWidth: '100%',
                      textAlign: 'left'
                    }}
                  >
                    {chat.text}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Paper>
      </Grid>

      {/* Document Viewer Section */}
      <Grid item xs={12} md={6} style={{ padding: '80px 40px 0 40px' }}>
        <Paper elevation={3} style={{ padding: '0px 5px', backgroundColor: '#fff' }}>
          {/* Tabs for Doc View, Raw View, Meta Data */}
          <Tabs value={tabValue} onChange={handleTabChange} indicatorColor="none">
            <Tab
              label="Doc View"
              sx={{
                fontWeight: 'bolder',
                '&.Mui-selected': { color: '#FF6600', backgroundColor: 'transparent' }
              }}
            />
            <Tab
              label="Raw View"
              sx={{
                fontWeight: 'bolder',
                '&.Mui-selected': { color: '#FF6600', backgroundColor: 'transparent' }
              }}
            />
            <Tab
              label="Meta Data"
              sx={{
                fontWeight: 'bolder',
                '&.Mui-selected': { color: '#FF6600', backgroundColor: 'transparent' }
              }}
            />
          </Tabs>

          {/* Document Content Based on Selected Tab */}
          <Box style={{ height: '800px', overflowY: 'auto' }}>
            {tabValue === 0 && (
              <Box style={{ height: '800px', backgroundColor: '#f5f5f5',textAlign:'center' }}>
                {pdfUrl ? (
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                    <div style={{ height: '100%', overflow: 'hidden' }}>
                      <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} />
                    </div>
                  </Worker>
                ) : (
                  <Typography>No PDF available at the moment.</Typography>
                )}
              </Box>
            )}
            {tabValue === 1 && (
              <Box style={{ padding: '20px 60px',height: '700px',overflowY: 'auto'  }}>
            
              <div
                style={{ whiteSpace: 'pre-wrap',textAlign:'center' }} 
                dangerouslySetInnerHTML={{ __html: rawText || 'No Raw Text Available' }}
              />
            </Box>
            )}
            {tabValue === 2 && (
              <div style={{ padding: '20px 60px', textAlign:'center',textAlign:'center' }}>
                {metaData ? (
                  Object.keys(metaData).map((key, index) => (
                    <Typography key={index}>
                      <strong> {key}:</strong> {metaData[key]}
                    </Typography>
                  ))
                ) : (
                  <Typography>No Meta Data available.</Typography>
                )}
              </div>
            )}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ChatBox;