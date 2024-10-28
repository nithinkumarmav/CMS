import React, { useState } from 'react';
import '../css/login.css';
// import background from '../assests/login-bg.png';
import background from '../assests/img/bg.mp4'
import { Divider, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  //post-payload(name,email)
  // return res
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleData(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()])(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const res = await axios.post("http://localhost:8080/api/create/emp", user)
      if (!validatePassword(user.password)) {
        setError('Invalid Email or Password.');
        return;
        //! we can give swal msg (Invalid password)
      }
      //session is best practice
      //     localStorage.setItem("userRole", userData?.role);
      //     localStorage.setItem("userId", user.uid);
      //     localStorage.setItem("email", user.email);
      //! if (role===admin) navigate('/admin') else navigate('/user')
      console.log(user);
      navigate('/dashboard');
      setError('');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      <div
        className="login-page-container"
        // style={{ backgroundImage: `url(${background})` }}
      >
        <video 
        src={background} 
        width="600" 
        height="400" 
        loop 
        autoPlay 
        muted
      >
      </video>
        <div className="header-container">
          <h2 className="welcome-txt">Welcome</h2>
          <h2>Contract Negotiation.Ai</h2>
        </div>
        <div className="login-form-container">
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              onChange={handleData}
              placeholder="Email"
              required
            />
            <input
              type="password"
              name="password"
              onChange={handleData}
              placeholder="Password"
              title="Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*())."
              required
            />
            {error && <div className="error-box">{error}</div>}

            <button className="login-signup-btn" type="submit">
              Login
            </button>
          </form>

          <Link to="/forgetpassword" className="forget-password">
            Forget Password?
          </Link>

          <Divider>
            <Typography
              variant="body1"
              style={{ backgroundColor: '#fff', padding: '0 10px' }}
            >
              OR
            </Typography>
          </Divider>
          <button
            className="login-signup-btn"
            onClick={() => navigate('/signup')}
          >
            SignUp
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
