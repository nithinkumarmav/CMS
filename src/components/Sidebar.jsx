import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import '../css/Sidebar.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { AccountCircle } from '@mui/icons-material';
import logo from '../assests/Johnson_Electric-Logo.png';
import jlogo from '../assests/jlogo.jpg';
import dashboardSvg from '../assests/icons/dashboard 3.svg';
import digitalLibrarySvg from '../assests/icons/digitalLibrary.svg';
import Workflow from '../assests/icons/workflow.svg';
import DocumentIngestion from '../assests/icons/DocumentIngestion.svg';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import support from '../assests/icons/support.svg';
import setting from '../assests/icons/Setting.svg';
import chatbox from '../assests/icons/chatbox.svg';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleMouseEnter = () => {
    setIsCollapsed(false);
  };

  const handleMouseLeave = () => {
    setIsCollapsed(true);
  };

  return (
    <React.Fragment>
      <div
        className={`sidebar-container ${isCollapsed ? 'collapsed' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* <button className="toggle-button">
          {isCollapsed ? <ArrowForwardIosIcon /> : <ArrowBackIosIcon />}
        </button> */}
        <div className="nav-logo">
          {isCollapsed ? (
            <img src={jlogo} className="jlogo" alt="logo" />
          ) : (
            <img src={logo} alt="logo" className="logo" />
          )}
          {!isCollapsed && (
            <p
              style={{
                color: '#F97316',
                fontWeight: 'bolder',
                padding: '0',
                margin: '0 0px 0 30px'
              }}
            >
              Contract Negotiation.Ai
            </p>
          )}
        </div>

        {/* Sidebar Links with Updated Icons */}
        <NavLink to="/dashboard" className="sidebar-link">
          <img src={dashboardSvg} alt="My SVG" className="sidebar-icon" />
          {!isCollapsed && 'Dashboard'}
        </NavLink>
        <NavLink to="/document-ingestion" className="sidebar-link">
          <img src={DocumentIngestion} alt="My SVG" className="sidebar-icon" />
          {!isCollapsed && 'Document Ingestion'}
        </NavLink>
        <NavLink to="/Workflow" className="sidebar-link">
          <img src={Workflow} alt="My SVG" className="sidebar-icon" />
          {!isCollapsed && 'Workflow'}
        </NavLink>
        <NavLink to="/digital-library" className="sidebar-link">
          <img src={digitalLibrarySvg} alt="My SVG" className="sidebar-icon" />
          {!isCollapsed && 'Digital library'}
        </NavLink>
        <NavLink to="/chat-box" className="sidebar-link">
          <img src={chatbox} alt="My SVG" className="sidebar-icon" />
          {!isCollapsed && 'Chat Box'}
        </NavLink>
        <NavLink to="/upload-doc" className="sidebar-link">
          <DescriptionOutlinedIcon alt="My SVG" className="sidebar-icon" />
          {!isCollapsed && 'Contract Negotiation'}
        </NavLink>

        <div
          className={`sidebar-divider ${isCollapsed ? 'collapsed' : ''}`}
        ></div>

        <NavLink to="/notifications" className="sidebar-link last-five">
          <NotificationsNoneIcon className="sidebar-icon notification" />
          {!isCollapsed && 'Notifications'}
        </NavLink>
        <NavLink to="/settings" className="sidebar-link last-five">
          <img src={setting} alt="My SVG" className="sidebar-icon " />
          {!isCollapsed && 'Settings'}
        </NavLink>
        <NavLink to="/support" className="sidebar-link last-five">
          <img src={support} alt="My SVG" className="sidebar-icon " />
          {!isCollapsed && 'Support'}
        </NavLink>
        <NavLink to="/" className="sidebar-link last-five">
          <img src={support} alt="My SVG" className="sidebar-icon " />
          {!isCollapsed && 'Logout'}
        </NavLink>
        <NavLink to="/admin" className="sidebar-link last-five">
          <img src={support} alt="My SVG" className="sidebar-icon " />
          {!isCollapsed && 'Admin'}
        </NavLink>

        <div
          className={`sidebar-divider ${isCollapsed ? 'collapsed' : ''}`}
        ></div>

        {/* User Profile */}

        <div className="user-profile">
          <AccountCircle className="user-image" />{' '}
          {!isCollapsed && (
            <div className="user-info">
              <span className="welcome-text">Welcome back 👋</span>
              <span className="username">Johnathan</span>
            </div>
          )}
          {!isCollapsed && <ArrowForwardIosIcon className="arrow-icon" />}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
