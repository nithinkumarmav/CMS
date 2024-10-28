import React, { useState } from 'react';
import {
  Paper,
  Grid,
  Avatar,
  Typography,
  TextField,
  Box,
  Button,
  IconButton
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import Sidebar from '../components/Sidebar';

const contracts = [
  {
    id: 'AZ341945',
    name: 'Audi',
    stage: 2,
    status: 'In Progress',
    turn: 'John Doe. 2Hr',
    assignee: ['AB', 'CD'],
    latestActivity: 'Document review 2 hr ago',
    date: '2024-08-03'
  },
  {
    id: 'AZ341946',
    name: 'Mercedes',
    stage: 1,
    status: 'Pending',
    turn: 'Alice Smith. 1Hr',
    assignee: ['EF', 'GH'],
    latestActivity: 'Initial contact 1 hr ago',
    date: '2024-08-04'
  },
  {
    id: 'AZ341947',
    name: 'Tesla',
    stage: 4,
    status: 'Completed',
    turn: 'Bob Johnson. 4Hr',
    assignee: ['IJ', 'KL'],
    latestActivity: 'Final approval 4 hr ago',
    date: '2024-08-05'
  },
  {
    id: 'AZ341948',
    name: 'Toyota',
    stage: 3,
    status: 'In Progress',
    turn: 'Charlie Brown. 3Hr',
    assignee: ['MN', 'OP'],
    latestActivity: 'Signature request 3 hr ago',
    date: '2024-08-06'
  },
  {
    id: 'AZ341949',
    name: 'Honda',
    stage: 2,
    status: 'Pending',
    turn: 'Diana Prince. 2Hr',
    assignee: ['QR', 'ST'],
    latestActivity: 'Document review 2 hr ago',
    date: '2024-08-07'
  },
  {
    id: 'AZ341944',
    name: 'BMW',
    stage: 4,
    status: 'Completed',
    turn: 'Jane Cooper. 3Hr',
    assignee: ['JS', 'MV'],
    latestActivity: 'Signature request 3 hr ago',
    date: '2024-08-02'
  }
];

const Workflow = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [showDateFilter, setShowDateFilter] = useState(false); // Toggle for showing date filter

  const handleTabChange = (index) => {
    setTabIndex(index);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDateChange = (event) => {
    setFilterDate(event.target.value);
  };

  const toggleDateFilter = () => {
    setShowDateFilter((prev) => !prev); // Toggle the visibility of the date filter
  };

  const resetFilters = () => {
    setSearchQuery('');
    setFilterDate('');
  };

  const filterContracts = (contracts) => {
    return contracts.filter((contract) => {
      const matchesSearch =
        contract.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contract.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contract.date.includes(searchQuery);
      const matchesDate = !filterDate || contract.date === filterDate;
      return matchesSearch && matchesDate;
    });
  };

  const renderStageDots = (stage) => {
    const totalDots = tabIndex === 1 ? stage + 1 : stage; // Increase dot for "In Progress"
    return (
      <>
        <Box display="flex" justifyContent="flex-start">
          {Array.from({ length: 4 }).map((_, index) => (
            <span
              key={index}
              style={{
                height: '10px',
                width: '10px',
                margin: '0 4px',
                backgroundColor: index < totalDots ? 'orange' : 'lightgray',
                borderRadius: '50%',
                display: 'inline-block'
              }}
            ></span>
          ))}
        </Box>
      </>
    );
  };

  const isHighlighted = (contract) => {
    return (
      searchQuery &&
      (contract.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contract.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contract.date.includes(searchQuery))
    );
  };

  return ( 
    <div className="workflow-design-container" style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ paddingTop: '50px', margin: '0 auto', width: '80%' }}>
        <Typography style={{ fontWeight: 'bold' }}>Workflow</Typography>
        {/* Search Input and Filter Icon */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mb={6}
          maxWidth="100%"
        >
          <TextField
            placeholder="Search Contract ID or Name.."
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              disableUnderline: true, // Remove the underline (default border)
              style: {
                textAlign: 'center', // Center the input text and placeholder
                borderRadius: '20px', // Add border radius for rounded corners
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' // Add box-shadow for visual effect
              }
            }}
            inputProps={{
              style: {
                textAlign: 'center' // Ensure the input field text is centered
              }
            }}
            style={{
              width: '650px',
              marginRight: '10px',
              backgroundColor: 'white',
              borderRadius: '20px' // Add border radius here too for outer box
            }}
          />
          {/* Filter Icon to Toggle Date Input */}
          <IconButton onClick={toggleDateFilter} style={{ marginLeft: '10px' }}>
            <FilterListIcon />
          </IconButton>
          {showDateFilter && (
            <Box display="flex" justifyContent="center" alignItems="center">
              <input
                type="date"
                value={filterDate}
                onChange={handleDateChange}
                style={{
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  marginLeft: '10px',
                  width: '150px',
                  textTransform: 'uppercase'
                }}
              />
            </Box>
          )}

          {/* Reset Filter Button */}
          <Button
            onClick={resetFilters}
            variant="contained"
            style={{
              marginLeft: '20px',
              backgroundColor: '#FF6600',
              color: '#FFF'
            }}
          >
            Reset Filters
          </Button>
        </Box>



        <Box display="flex" justifyContent="flex-start" mb={3}>
          {['Assign to me', 'In progress', 'Completed'].map((tab, index) => (
            <Box
              key={index}
              onClick={() => handleTabChange(index)}
              sx={{
                cursor: 'pointer',
                padding: '30px 40px', 
                marginRight: '10px',
                backgroundColor: tabIndex === index ? '#FF6600' : '#FFF',
                color: tabIndex === index ? '#FFF' : 'grey',
                borderRadius: '20px',
                border:
                  tabIndex === index ? '1px solid #FF6600' : '1px solid grey',
                textAlign: 'center',
                transition: 'all 0.5s ease-in-out',
                '&:hover': {
                  backgroundColor: tabIndex === index ? '#FF6600' : '#f0f0f0'
                }
              }}
            >
              <Typography>{tab}</Typography>
            </Box>
          ))}
        </Box>

        {/* Current Tab Name */}
        <Typography variant="h6" style={{ marginBottom: '20px' }}>
          {tabIndex === 0 && 'Assign to me'}
          {tabIndex === 1 && 'In progress'}
          {tabIndex === 2 && 'Completed'}
        </Typography>

        {/* Data Field Headings */}
        <Paper
          style={{
            padding: '10px',
            marginBottom: '10px',
            backgroundColor: '#fff',
            padding: '20px', // Added padding inside the row
             boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Grid container spacing={1}>
            {' '}
            {/* Decreased spacing for better fit */}
            <Grid item xs={1.5}>
              {' '}
              {/* Adjusted size */}
              <Typography variant="subtitle1" style={{ fontWeight: 'bold',fontSize: '20px'  }}>
                Contract ID
              </Typography>
            </Grid>
            <Grid item xs={2}>
              {' '}
              {/* Adjusted size */}
              <Typography variant="subtitle1" style={{ fontWeight: 'bold' ,fontSize: '20px' }}>
                Name
              </Typography>
            </Grid>
            <Grid item xs={1.5}>
              {' '}
              {/* Adjusted size */}
              <Typography variant="subtitle1" style={{ fontWeight: 'bold' ,fontSize: '20px' }}>
                Stage
              </Typography>
            </Grid>
            <Grid item xs={2}>
              {' '}
              {/* Adjusted size */}
              <Typography variant="subtitle1" style={{ fontWeight: 'bold' ,fontSize: '20px' }}>
                Turn
              </Typography>
            </Grid>
            <Grid item xs={1.5}>
              {' '}
              {/* Adjusted size */}
              <Typography variant="subtitle1" style={{ fontWeight: 'bold' ,fontSize: '20px' }}>
                Assignee
              </Typography>
            </Grid>
            <Grid item xs={2}>
              {' '}
              {/* Adjusted size */}
              <Typography variant="subtitle1" style={{ fontWeight: 'bold' ,fontSize: '20px' }}>
                Latest Activity
              </Typography>
            </Grid>
            <Grid item xs={1}>
              {' '}
              {/* Added Date Field */}
              <Typography variant="subtitle1" style={{ fontWeight: 'bold' ,fontSize: '20px' }}>
                Date
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Contract List */}
        <div style={{ maxHeight: '450px', overflowY: 'auto' }}>
          {filterContracts(contracts).map((contract) => (
            <Paper
              key={contract.id}
              style={{
                margin: '16px 0',
                padding: '16px',
                borderRadius: '8px',
                backgroundColor: isHighlighted(contract) ? '#ffebcd' : '#fff' // Highlighting the row if it's a search result
              }}
            >
              <Grid container spacing={1} alignItems="center">
                {' '}
                {/* Decreased spacing for better fit */}
                <Grid item xs={1.5}>
                  {' '}
                  {/* Adjusted size */}
                  <Typography variant="subtitle1" style={{ fontSize: '20px' }}>{contract.id}</Typography>
                </Grid>
                <Grid item xs={2}>
                  {' '}
                  {/* Adjusted size */}
                  <Typography variant="subtitle1" style={{ fontSize: '20px' }}>{contract.name}</Typography>
                </Grid>
                <Grid item xs={1.5}>
                  {' '}
                  {/* Adjusted size */}
                  {renderStageDots(contract.stage)}
                  <Typography
                    variant="body2"
                    style={{ marginTop: '5px', fontStyle: 'italic' }}
                  >
                    {contract.status}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  {' '}
                  {/* Adjusted size */}
                  <Typography variant="subtitle1" style={{ fontSize: '20px' }}>{contract.turn}</Typography>
                </Grid>
                <Grid item xs={1.5}>
                  {' '}
                  {/* Adjusted size */}
                  <Box display="flex">
                    {contract.assignee.map((assignee) => (
                      <Avatar
                        key={assignee}
                        style={{
                          marginRight: '4px',
                          backgroundColor: '#FF6600'
                        }}
                      >
                        {assignee}
                      </Avatar>
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={2}>
                  {' '}
                  {/* Adjusted size */}
                  <Typography variant="body2" style={{ fontSize: '20px' }}>
                    {contract.latestActivity}
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  {' '}
                  {/* Added Date Field */}
                  <Typography variant="body2" style={{ fontSize: '20px' }}>{contract.date}</Typography>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Workflow;
