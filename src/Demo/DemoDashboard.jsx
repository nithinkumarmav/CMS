import React, { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, IconButton, Typography } from '@mui/material';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import { useNavigate } from 'react-router-dom';

const DemoDashboard = () => {
  const [selectedButton, setSelectedButton] = useState('');
  const data = [
    { id: 1, name: 'DocumentFinalizationDeadline', value: 'None' },
    { id: 2, name: 'LatePaymentCharge', value: 'None' },
    { id: 3, name: 'EndOfProductLife', value: 'If requested by the Buyer, the Supplier will supply past model year Service Parts.' },
    { id: 4, name: 'WarrantyPeriod', value: 'A Government Requirement may include specific warranty periods or terms.' },
    { id: 5, name: 'ProductNonConformanceNoticePeriod', value: 'The Buyer will inform the Supplier about the nonconformity as soon as practicable.' },
    { id: 6, name: 'ProductReturnProcedure', value: '' },
  ];
  const [metaData, setMetaData] = useState(data);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = (buttonType) => {
    setSelectedButton(buttonType);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', width: '100%' }}>
      <IconButton onClick={() => navigate(-1)} sx={{ display: 'flex', justifyContent: "center" }}>
        <KeyboardArrowLeftOutlinedIcon sx={{ color: '#f59e0b', fontSize: '35px' }} />
      </IconButton>

      <h1 style={{fontSize:'45px'}}>Dashboard</h1>

      {/* Button Container */}
      <div style={{ marginBottom: '80px' }}>
        <Button
          variant="contained"
          onClick={() => handleButtonClick('metaData')}
          sx={{
            fontSize:'18px',
            marginRight: '30px',
            padding:'10px 20px',
            backgroundColor: '#f59e0b',
            '&:hover': { backgroundColor: '#d97706' },
            color: 'white'
          }}
        >
          Meta Data
        </Button>
        <Button
          variant="contained"
          onClick={() => handleButtonClick('deviation')}
          sx={{
            fontSize:'18px',
            marginRight: '30px',
            padding:'10px 20px',
            backgroundColor: '#f59e0b',
            '&:hover': { backgroundColor: '#d97706' },
            color: 'white'
          }}
        >
          Deviation in Clause
        </Button>
        <Button
          variant="contained"
          onClick={() => handleButtonClick('report')}
          sx={{
            fontSize:'18px',
            padding:'10px 20px',
            backgroundColor: '#f59e0b',
            '&:hover': { backgroundColor: '#d97706' },
            color: 'white'
          }}
        >
          Report
        </Button>
      </div>

      {/* Show Loader or Table */}
      {loading ? (
        <CircularProgress color="warning" />
      ) : selectedButton === 'metaData' && metaData.length > 0 ? (
          <div>
          <Typography style={{textAlign:'start',width: '80%', margin:'0 auto',marginBottom:'20px',fontSize:'30px'}}>Draft Document Meta Data</Typography>
        <TableContainer
          component={Paper}
          sx={{
            width: '80%',
            margin: '0 auto',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            transition: 'box-shadow 0.3s ease',
            '&:hover': {
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          <Table size="large" aria-label="meta data table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f59e0b', color: 'white', borderRight: '1px solid #d1d5db',}}>
                  Meta Data
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f59e0b', color: 'white' }}>
                  Meta Data Value
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {metaData.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    transition: 'background-color 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#f3f4f6',
                    },
                  }}
                >
                  <TableCell
                    sx={{
                      borderRight: '1px solid #d1d5db',  // Adding vertical lines to the right of each cell
                    }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: '1px solid #d1d5db',  // Adding vertical lines to the right of each cell
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
      ) : selectedButton === 'deviation' && metaData.length > 0 ? (
            <div>
               <Typography style={{textAlign:'start',width: '80%', margin:'0 auto',marginBottom:'20px',fontSize:'30px'}}>Standard and Draft Document Deviation</Typography>

        </div>
          ) : (
              <p></p>
      )}
    </div>
  );
};

export default DemoDashboard;
