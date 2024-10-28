import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import {
  Paper,
  Grid,
  Typography,
  TextField,
  Box,
  Button,
  Select,
  MenuItem,
} from '@mui/material';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';

// Dummy data
const dummyData = [
  {
    indexNo: 'TB241954',
    recordName: 'Ford Motor Company.PDF',
    counterPartyName: 'FORD MOTOR COMPANY',
    recordType: 'Mutual NDA',
    agreementDate: 'April 11, 2019',
  },
  {
    indexNo: 'TB241955',
    recordName: 'Tesla Motors.PDF',
    counterPartyName: 'TESLA INC.',
    recordType: 'Confidential Agreement',
    agreementDate: 'May 1, 2020',
  },
  {
    indexNo: 'TB241956',
    recordName: 'GM Partnership.PDF',
    counterPartyName: 'GENERAL MOTORS',
    recordType: 'Partnership Agreement',
    agreementDate: 'June 15, 2021',
  },
  {
    indexNo: 'TB241957',
    recordName: 'Volkswagen Agreement.PDF',
    counterPartyName: 'VOLKSWAGEN AG',
    recordType: 'Joint Venture',
    agreementDate: 'July 30, 2022',
  },
  {
    indexNo: 'TB241958',
    recordName: 'Honda Agreement.PDF',
    counterPartyName: 'HONDA MOTOR CO.',
    recordType: 'Non-Disclosure Agreement',
    agreementDate: 'August 20, 2023',
  },
];

const DigitalLibrary = () => {
  const [showFilter,setShowFilter]=useState(false)
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(dummyData);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = dummyData.filter((item) =>
      item.recordName.toLowerCase().includes(query)
    );
    setFilteredData(filtered);
  };

  // Dummy filters
  const [region, setRegion] = useState('');
  const [productGroup, setProductGroup] = useState('');
  const [counterparty, setCounterparty] = useState('');
  const [agreementDate, setAgreementDate] = useState('');

  const filterContracts = (data) => {
    // Implement filtering logic if needed
    return data; // For now, returning data without filtering
  };

  const isHighlighted = (contract) => {
    // Implement your highlight logic
    return false; // Example: Highlight logic can be defined here
  };

  return (
    <div className="workflow-design-container" style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ paddingTop: '50px', margin: '0 auto', width: '80%' }}>
        <Typography style={{ fontWeight: 'bold', marginBottom: '20px' }}>
          Digital Library
        </Typography>

        <Box mb={6}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb={6}
            maxWidth="100%"
          >
            <TextField
              placeholder="Search Completed"
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                disableUnderline: true,
                style: {
                  textAlign: 'center',
                  borderRadius: '20px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                },
              }}
              inputProps={{
                style: {
                  textAlign: 'center',
                },
              }}
              style={{
                width: '700px',
                marginRight: '40px',
                backgroundColor: 'white',
                borderRadius: '20px',
              }}
            />
            <Button
              variant="outlined"
              style={{
                backgroundColor: '#ff9100',
                color: 'white',
                border: 'none',
                padding:'10px 10px'
              }}
            >
              Export
              <FileUploadOutlinedIcon style={{ marginLeft: '5px' }} />
            </Button>
            <Button
              variant="outlined"
              style={{
                backgroundColor: '#ff9100',
                color: 'white',
                border: 'none',
                padding: '10px 10px',
                marginLeft: '40px',
              }}
              onClick={()=>setShowFilter(!showFilter)}
            >
              Filter
              <FilterListOutlinedIcon style={{ marginLeft: '5px' }} />
            </Button>
          </Box>
          {showFilter ?
          <Box display="flex" alignItems="center" backgroundColor="white" padding="50px 30px" borderRadius="20px" boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)">
          <Select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            displayEmpty
            style={{ marginRight: '10px', width: '350px' }}
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="">
              <em>Region</em>
            </MenuItem>
            <MenuItem value="north">North</MenuItem>
            <MenuItem value="south">South</MenuItem>
          </Select>
          <Select
            value={productGroup}
            onChange={(e) => setProductGroup(e.target.value)}
            displayEmpty
            style={{ marginRight: '10px', width: '350px' }}
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="">
              <em>Product Group</em>
            </MenuItem>
            <MenuItem value="group1">Group 1</MenuItem>
            <MenuItem value="group2">Group 2</MenuItem>
          </Select>
          <TextField
            placeholder="Counterparty"
            value={counterparty}
            onChange={(e) => setCounterparty(e.target.value)}
            style={{ marginRight: '10px', width: '350px' }}
          />
          <TextField
            type="date"
            value={agreementDate}
            onChange={(e) => setAgreementDate(e.target.value)}
            style={{ marginRight: '10px', width: '250px' }}
          />
          <Button
            variant="contained"
            style={{
              backgroundColor: '#ff9100',
              color: 'white',
              width: "130px",
              marginLeft: '20px',
              padding:'15px 10px'
            }}
          >
            Apply
          </Button>
        </Box>
            :
            null
}

        </Box>

        {/* Table Header */}
        <Paper style={{ padding: '16px', marginBottom: '16px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <Typography variant="subtitle1" style={{ fontWeight: 'bold', fontSize: '20px' }}>
                Index No
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1" style={{ fontWeight: 'bold', fontSize: '20px' }}>
                Record Name
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1" style={{ fontWeight: 'bold', fontSize: '20px' }}>
                Counter Party Name
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="subtitle1" style={{ fontWeight: 'bold', fontSize: '20px' }}>
                Record Type
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="subtitle1" style={{ fontWeight: 'bold', fontSize: '20px' }}>
                Agreement Date
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Contract List */}
        <div style={{ maxHeight: '450px', overflowY: 'auto' }}>
          {filteredData.map((contract) => (
            <Paper
              key={contract.indexNo}
              style={{
                margin: '16px 0',
                padding: '16px',
                borderRadius: '8px',
                backgroundColor: isHighlighted(contract) ? '#ffebcd' : '#fff', // Highlighting the row if it's a search result
                padding: '20px', 
              }}
            >
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={2}>
                  <Typography variant="subtitle1" style={{ fontSize: '20px' }}>{contract.indexNo}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="subtitle1" style={{ fontSize: '20px' }}>{contract.recordName}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="subtitle1" style={{ fontSize: '20px' }}>{contract.counterPartyName}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="subtitle1" style={{ fontSize: '20px' }}>{contract.recordType}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="subtitle1" style={{ fontSize: '20px' }}>{contract.agreementDate}</Typography>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DigitalLibrary;
