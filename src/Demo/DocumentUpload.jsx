import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, IconButton, Grid, Card, CardContent, Tabs, Tab, Paper, TableCell, TableRow, TableBody, TableHead, Table, TableContainer,CircularProgress } from '@mui/material';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Assessment, Done, ErrorOutline } from '@mui/icons-material';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { API_BASE_URL } from '../utils/constants';

const DocumentUpload = () => {
  const [expandedStandard, setExpandedStandard] = useState([]);
  const [expandedDraft, setExpandedDraft] = useState([]);
  

  const [metaData, setMetaData] = useState(null);
  const [deviationData, setDeviationData] = useState([]);
  const [reportData, setReportData] = useState(null);
  const [standardTermFile, setStandardTermFile] = useState(null);
  const [draftAgreementFile, setDraftAgreementFile] = useState(null);
  const [isDraggingStandardTerm, setIsDraggingStandardTerm] = useState(false); //drag&drop
  const [isDraggingDraftAgreement, setIsDraggingDraftAgreement] =useState(false);//drag&drop
  const [activeTab, setActiveTab] = useState(0); // Tab State
  const [filterTabs,setFilterTabs]=useState(null) // for filter data
  const [apiRes, setApiRes] = useState(false); // disable tabs
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate();

  const handleFileChange = (event, setFile) => {
    setFile(event.target.files[0]);
  };

  const handleFileRemove = (setFile) => {
    setFile(null);
  };


    const handleDrop = (event, setFile) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        setFile(file);
        setIsDraggingStandardTerm(false);
        setIsDraggingDraftAgreement(false);
      };
    
    const handleDragOver = (event, setDraggingState) => {
        event.preventDefault();
        setDraggingState(true);
      };
    
      const handleDragLeave = (setDraggingState) => {
        setDraggingState(false);
      };

  const renderText = (text, expandedState, index, handleExpand, type) => {
    const limit = 100;
 
    const displayText = text ? text : 'N/A';
 
    return (
      <>
        {expandedState[index]
          ? displayText
          : `${displayText.substring(0, limit)}${displayText.length > limit ? '...' : ''}`}
        {displayText.length > limit && (
          <Button
            size="small"
            onClick={() => handleExpand(index)}
            sx={{ color: '#1976d2' }}
          >
            {expandedState[index] ? 'Show Less' : 'Show More'}
          </Button>
        )}
      </>
    );
  };


  useEffect(() => {
    if (metaData) {
      setExpandedStandard(Array(metaData.length).fill(false)); 
    }
    if (reportData) {
      setExpandedDraft(Array(reportData.length).fill(false)); 
    }
  }, [metaData, reportData]);

  const handleUpload = async () => {
    if (standardTermFile && draftAgreementFile) {
      const formData = new FormData();
      formData.append('standardTermFile', standardTermFile);
      formData.append('draftAgreementFile', draftAgreementFile);
  
      try {
        const uploadResponse = await axios.post(`${API_BASE_URL}/Deviation_uploader`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        console.log('Upload successful', uploadResponse.data);
        setLoading(true)
        const metaDataRes = await axios.get(`${API_BASE_URL}/Meta_data`);      
        const formattedData = Object.entries(metaDataRes.data.draft_meta_data).map(([key, value]) => ({
          name: key,
          value: value ?String(value) :'N/A'
        }));
        setMetaData(formattedData);
  
        const deviationRes = await axios.get(`${API_BASE_URL}/Deviation`)
          setDeviationData(deviationRes.data.deviation_result);
          
        const reportDataRes = await axios.get(`${API_BASE_URL}/report`);
        setReportData(reportDataRes.data.Result);
          setApiRes(true);
          setLoading(false)
      } catch (error) {
        console.error('Error during upload or fetching data:', error);
      }
    } else {
      console.log("Both files must be selected before uploading.");
    }
      };
    
    const exportExcel = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/export`, {
            responseType: 'blob', 
          });
      
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'data.xlsx'); // File name
          document.body.appendChild(link);
          link.click();
      
    
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        } catch (error) {
          console.error('Error exporting data', error);
        }
      };

const reviewFilter = (filterVal) => {
    console.log(filterVal);
    let filteredDeviation = deviationData.filter((val, index) => {
      // eslint-disable-next-line no-unused-expressions
     return val.deviation === filterVal ? val : null;
    });
    console.log(filteredDeviation);
    setFilterTabs(filteredDeviation)
    setActiveTab(2);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ padding: '15px', width: '1200px', margin: '0 auto' }}>
      {/* Back button */}
      <IconButton onClick={() => navigate(-1)}>
        <KeyboardArrowLeftOutlinedIcon
          sx={{ color: '#f59e0b', fontSize: '35px'}}
        />
      </IconButton>

      {/* File Upload Section */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '50px',marginTop:'20px' }}>
        {/* Upload Standard Term Document */}
        <Card
          sx={{ marginBottom: '20px', padding: '10px 30px', width: '500px' }}
        >
          <CardContent>
            <Typography variant="h6">Upload Standard Terms</Typography>
            <Grid
              container
              alignItems="center"
              spacing={2}
              sx={{ marginTop: '10px' }}
            >
              <Grid item xs={11}>
              <Box
                  onDragOver={(e) =>
                    handleDragOver(e, setIsDraggingStandardTerm)
                  }
                  onDragLeave={() => handleDragLeave(setIsDraggingStandardTerm)}
                  onDrop={(e) => handleDrop(e, setStandardTermFile)}
                  sx={{
                    border: standardTermFile
                      ? '2px dashed #f59e0b'
                      : '2px dashed grey',
                    padding: '20px',
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#000',
                    cursor: 'pointer'
                  }}
                >
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, setStandardTermFile)}
                    style={{ display: 'none' }}
                    id="standardTermFile"
                  />
                  <DriveFolderUploadIcon
                    sx={{
                      paddingRight: '10px',
                      color: '#f59e0b',
                      fontSize: '35px'
                    }}
                  />
                  <label htmlFor="standardTermFile">
                    {standardTermFile
                      ? standardTermFile.name
                      : 'Drag and drop file here or click to upload'}
                  </label>
                </Box>
              </Grid>
              <Grid item xs={1}>
                {standardTermFile && (
                  <IconButton
                    onClick={() => handleFileRemove(setStandardTermFile)}
                  >
                    <CloseIcon />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Upload Draft Agreement Document */}
        <Card
          sx={{ marginBottom: '20px', padding: '10px 30px', width: '500px' }}
        >
          <CardContent>
            <Typography variant="h6">Upload Draft Agreement</Typography>
            <Grid
              container
              alignItems="center"
              spacing={2}
              sx={{ marginTop: '10px' }}
            >
              <Grid item xs={11}>
              <Box
                  onDragOver={(e) =>
                    handleDragOver(e, setIsDraggingDraftAgreement)
                  }
                  onDragLeave={() =>
                    handleDragLeave(setIsDraggingDraftAgreement)
                  }
                  onDrop={(e) => handleDrop(e, setDraftAgreementFile)}
                  sx={{
                    border: draftAgreementFile
                      ? '2px dashed #f59e0b'
                      : '2px dashed grey',
                    padding: '20px',
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#000',
                    cursor: 'pointer'
                  }}
                >
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, setDraftAgreementFile)}
                    style={{ display: 'none' }}
                    id="draftAgreementFile"
                  />
                  <DriveFolderUploadIcon
                    sx={{
                      paddingRight: '10px',
                      color: '#f59e0b',
                      fontSize: '35px'
                    }}
                  />
                  <label htmlFor="draftAgreementFile">
                    {draftAgreementFile
                      ? draftAgreementFile.name
                      : 'Drag and drop file here or click to upload'}
                  </label>
                </Box>
              </Grid>
              <Grid item xs={1}>
                {draftAgreementFile && (
                  <IconButton
                    onClick={() => handleFileRemove(setDraftAgreementFile)}
                  >
                    <CloseIcon />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>

      {/* Show upload button only if both files are uploaded */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={!standardTermFile || !draftAgreementFile} // Disabled until both files are uploaded
          sx={{
            backgroundColor: '#f59e0b',
            color: '#fff',
            '&:hover': { backgroundColor: '#d97706' },
            width: '100px',
            height: '40px'
          }}
        >
          Submit
        </Button>
      </div>

      {/* Tabs Section */}
      {activeTab !== null && (
        <Paper sx={{ marginTop: '20px', padding: '20px' }}>
          <div style={{display:'flex',justifyContent:'space-between'}}>
          <Tabs
            value={activeTab}
            TabIndicatorProps={{
              style: {
                backgroundColor: '#FF6600'
              }
            }}
            onChange={handleTabChange}
          >
            <Tab
              label="Report"
              sx={{
                fontWeight: 'bolder',
                borderBottom: 'none',
                '&.Mui-selected': {
                  color: '#FF6600',
                  borderBottom: 'none',
                  backgroundColor: 'transparent'
                }
              }}
            />

            <Tab
              label="Meta Data (Draft Agreement)"
              disabled={!apiRes}
              sx={{
                color: 'grey',
                fontWeight: 'bolder',
                borderBottom: 'none',
                '&.Mui-selected': {
                  color: '#FF6600',
                  borderBottom: 'none',
                  backgroundColor: 'transparent'
                }
              }}
            />
            <Tab
              label="Deviation in Clause"
              disabled={!apiRes}
              onClick={() => setFilterTabs(deviationData)}
              sx={{
                color: 'grey',
                fontWeight: 'bolder',
                borderBottom: 'none',
                '&.Mui-selected': {
                  color: '#FF6600',
                  borderBottom: 'none',
                  backgroundColor: 'transparent'
                }
              }}
            />
          </Tabs>

            <Button variant='contained' color='success' disabled={!apiRes} onClick={exportExcel} style={{ height: '40px', alignItems: 'center', }}>EXPORT</Button>
          </div>

          <Box sx={{ marginTop: '20px' }}>
            {activeTab === 0 && (
              <Box
                sx={{
                  background: 'linear-gradient(-15deg, #fbd38d, #f68b1f)',
                  minHeight: '40vh',
                  padding: '40px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Box>
                  <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                      color: '#fff',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      marginBottom: '40px',
                      fontFamily: 'serif'
                    }}
                  >
                    Contract Review Report
                </Typography>
                {/* Loading */}
                {loading && (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '20px'
                      }}
                    >
                      <CircularProgress sx={{ color: '#fff' }} />
                    </Box>
                  )}
                  <Grid container spacing={4} justifyContent="center">
                    {reportData?.map((item, index) => (
                      <Grid item key={index} xs={12} sm={6} md={4}>
                        <Card
                          sx={{

                            backgroundColor: '#fff',
                            borderRadius: '16px',
                            boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                              transform: 'scale(1.05)'
                            }
                          }}
                          onClick={() => reviewFilter(item.category)}
                        >
                          <CardContent
                            sx={{
                              textAlign: 'center'
                            }}
                          >
                            {item.category === 'Need Review' ? (
                              <ReportProblemIcon 
                                style={{ fontSize: 40, color: '#fbd38d' }}
                              />
                            ) : item.category === 'Matched' ? (
                              <Done
                                style={{ fontSize: 40, color: '#4CAF50' }}
                              />
                            ) : item.category === 'Missed Clause' ? (
                              <ErrorOutline
                                    style={{ fontSize: 40, color: 'red' }}
                              />
                            ) : null}

                            <Typography
                              variant="h5"
                              sx={{
                                // fontWeight: 'bold',
                                marginTop: '10px',
                                fontFamily: 'serif'
                              }}
                            >
                              {item.category}
                            </Typography>
                            <Typography
                              variant="h4"
                              sx={{
                                color: '#3E4551',
                                fontWeight: 'bold',
                                marginTop: '10px'
                              }}
                            >
                              {item.count}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Box>
            )}
            {activeTab === 1 && (
              <div>
              <TableContainer
                component={Paper}
                sx={{
                  width: '100%',
                  margin: '0 auto',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'box-shadow 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
                  },
                  height: '500px',
                  overflowY: 'auto'
                }}
              >
                <Table size="large" aria-label="meta data table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          fontWeight: 'bold',
                          backgroundColor: '#f59e0b',
                          color: 'white',
                          borderRight: '1px solid #d1d5db',
                          position: 'sticky',
                          top: 0,
                          zIndex: 1
                        }}
                      >
                        Meta Data
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 'bold',
                          backgroundColor: '#f59e0b',
                          color: 'white',
                          position: 'sticky',
                          top: 0,
                          zIndex: 1
                        }}
                      >
                        Meta Data Value
                      </TableCell>
                    </TableRow>
                  </TableHead>
        
                  <TableBody>
                    {metaData.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          transition: 'background-color 0.3s ease',
                          '&:hover': {
                            backgroundColor: '#f3f4f6'
                          }
                        }}
                      >
                        <TableCell
                          sx={{
                            borderRight: '1px solid #d1d5db'
                          }}
                        >
                          {row.name}
                        </TableCell>
                        <TableCell
                          sx={{
                            borderRight: '1px solid #d1d5db'
                          }}
                        >
                          {row.value || 'None'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            )}
            {activeTab === 2 && (
 <div>
 <TableContainer
   component={Paper}
   sx={{
     width: '100%',
     margin: '0 auto',
     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
     transition: 'box-shadow 0.3s ease',
     '&:hover': {
       boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
     },
     maxHeight: '500px',
     overflowY: 'auto',
   }}
 >
   <Table size="large" aria-label="meta data table">
     <TableHead>
       <TableRow>
         <TableCell
           sx={{
             fontWeight: 'bold',
             backgroundColor: '#f59e0b',
             color: 'white',
             borderRight: '1px solid #d1d5db',
             position: 'sticky',
             top: 0,
             zIndex: 1
           }}
         >
           Question
         </TableCell>
         <TableCell
           sx={{
             fontWeight: 'bold',
             backgroundColor: '#f59e0b',
               color: 'white',
               borderRight: '1px solid #d1d5db',
             position: 'sticky',
             top: 0,
             zIndex: 1
           }}
         >
           Standard
         </TableCell>
         <TableCell
           sx={{
             fontWeight: 'bold',
             backgroundColor: '#f59e0b',
               color: 'white',
               borderRight: '1px solid #d1d5db',
             position: 'sticky',
             top: 0,
             zIndex: 1
           }}
         >
           Draft
         </TableCell>
         <TableCell
           sx={{
             fontWeight: 'bold',
             backgroundColor: '#f59e0b',
               color: 'white',
               borderRight: '1px solid #d1d5db',
             position: 'sticky',
             top: 0,
             zIndex: 1
           }}
         >
           Deviation
         </TableCell>
       </TableRow>
     </TableHead>

     <TableBody>
       {filterTabs.map((row, index) => (
         <TableRow
           key={index}
           sx={{
             transition: 'background-color 0.3s ease',
             '&:hover': {
               backgroundColor: '#f3f4f6'
             }
           }}
         >
           <TableCell
             sx={{
               fontSize:"16px",
               borderRight: '1px solid #d1d5db'
             }}
           >
             {row.question}
           </TableCell>
           <TableCell
             sx={{
               fontSize:"16px",
               borderRight: '1px solid #d1d5db'
             }}
           >
             {row.standard || 'None'}
           </TableCell>
           <TableCell
             sx={{
               fontSize:"16px",
               borderRight: '1px solid #d1d5db'
             }}
           >
             {row.draft || 'None'}
           </TableCell>
           <TableCell
             sx={{
               fontSize:"16px",
               borderRight: '1px solid #d1d5db'
             }}
           >
             {row.deviation || '-'}
           </TableCell>
         </TableRow>
       ))}
     </TableBody>
   </Table>
 </TableContainer>
</div>
            )}
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default DocumentUpload;