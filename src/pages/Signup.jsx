import React, { useState } from 'react';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
// import background from '../assests/login-bg.png';
import background from '../assests/img/bg.mp4'
import "../css/signup.css"
import { useNavigate } from 'react-router-dom';
const Signup = () => {
    const [profileImage, setProfileImage] = useState(null);
    const navigate=useNavigate()
    // Handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result); // Set the preview
            };
            reader.readAsDataURL(file);
        }
    };
  
    return (
      <div className="signup-container"
        style={{
          // backgroundImage: `url(${background})`
        }}>
          <video 
        src={background} 
        width="600" 
        height="400" 
        loop 
        autoPlay 
        muted
      >
      </video>
        <h1 className="signup-welcome-text">Welcome</h1>
        <h2 className="signup-title">Contract Negotiation.AI</h2>
  
        <div className="signup-card">
          <h2 className="signup-header">Sign Up</h2>
          <div className="profile-picture-container">
            <div className="profile-picture">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="profile-image" />
              ) : (
                <div className="signup-placeholder">
                <span className="signup-placeholder-icon">&#128100;</span>
              </div>
              )}
              <label htmlFor="upload-photo" className="camera-icon-label">
                <CameraAltIcon className="camera-icon" />
              </label>
              <input
                type="file"
                id="upload-photo"
                style={{ display: 'none' }}
                onChange={handleImageUpload}
              />
            </div>
          </div>
          <form className="signup-form">
            <input type="text" placeholder="Name" className="signup-input" />
            <input type="email" placeholder="Email Id" className="signup-input" />
            <input type="text" placeholder="Mobile Number" className="signup-input" />
            <input type="password" placeholder="Password" className="signup-input" />
            <small className="password-instructions">
              Must have at least 6 characters. <br />
              <span className="instruction-point">• Upper & Lower Case Letter</span><br />
              <span className="instruction-point">• A Symbol($#@)</span><br />
              <span className="instruction-point">• A Longer Password</span>
            </small>
            <input type="password" placeholder="Confirm Password" className="signup-input" />
            <button type="submit" className="signup-button">Sign Up</button>
          </form>
          <div className="divider">
            <span className="divider-line" />
            <span className="divider-text">Or</span>
            <span className="divider-line" />
          </div>
          <button className="signin-button" onClick={()=>navigate("/")}>Sign In</button>
        </div>
      </div>
    );
}
export default Signup;
