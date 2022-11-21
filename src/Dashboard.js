import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Outlet } from 'react-router';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './redux/slices/loginSlice';
import { doctorsFetchThunk } from './redux/slices/doctorSlice';
import Login from './components/Login';
import Splash from './components/Splash';
import Profile from './components/Profile';

function Dashboard() {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.token);

  useEffect(() => {
    dispatch(doctorsFetchThunk());
  }, []);

  const handleLogOut = () => {
    dispatch(logout());
    return <Login />;
  };

  return (
    <Container>
      <Row>
        <Col xs={3}>
          <h1>Menu</h1>
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            { (token.isLoggedIn === undefined || !token.isLoggedIn) && <li><NavLink to="/signup">Sign Up</NavLink></li> }
            { (token.isLoggedIn === undefined || !token.isLoggedIn) && <li><NavLink to="/login">Sign In</NavLink></li> }
            { (token.isLoggedIn !== undefined && token.isLoggedIn && token.role === 'admin')
              && <li><NavLink to="/doctor">Add Doctor</NavLink></li>}
            { (token.isLoggedIn !== undefined && token.isLoggedIn)
              && <li><NavLink to="/doctors/">Doctors</NavLink></li>}
            { (token.isLoggedIn !== undefined && token.isLoggedIn)
              && <li><NavLink to="/appointments">Book Appointment</NavLink></li>}
            { (token.isLoggedIn !== undefined && token.isLoggedIn)
              && <li><NavLink to="/myappointments">My Appointments</NavLink></li>}
            { (token.isLoggedIn !== undefined && token.isLoggedIn)
              && <li><NavLink onClick={handleLogOut}>Sign Out</NavLink></li>}
          </ul>
        </Col>
        <Col xs={9}>
          <Profile />
          <Splash />
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
