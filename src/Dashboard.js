import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import {
  FaHome, FaUserPlus, FaSignInAlt, FaSignOutAlt, FaEdit, FaList,
} from 'react-icons/fa';
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
import NavMenu from './components/NavBar';

const Dashboard = () => {
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
    <Container fluid>
      <Row>
        <NavMenu />
        <Col xs={12} md={2} className="menu">
          <h1 className="text-center my-4">Doctors Appointment</h1>
          <ul>
            <li>
              <NavLink to="/">
                <FaHome />
                {' '}
                Home
              </NavLink>
            </li>
            { (token.isLoggedIn === undefined || !token.isLoggedIn) && (
            <li>
              <NavLink to="/signup">
                <FaUserPlus />
                {' '}
                Sign Up
              </NavLink>
            </li>
            ) }
            { (token.isLoggedIn === undefined || !token.isLoggedIn) && (
            <li>
              <NavLink to="/login">
                <FaSignInAlt />
                {' '}
                Sign In
              </NavLink>
            </li>
            ) }
            { (token.isLoggedIn !== undefined && token.isLoggedIn && token.role === 'admin')
              && (
              <li>
                <NavLink to="/doctor">
                  <FaEdit />
                  {' '}
                  Add Doctor
                </NavLink>
              </li>
              )}
            { (token.isLoggedIn !== undefined && token.isLoggedIn)
              && (
              <li>
                <NavLink to="/doctors/">
                  <FaList />
                  {' '}
                  Doctors
                </NavLink>
              </li>
              )}
            { (token.isLoggedIn !== undefined && token.isLoggedIn)
              && (
              <li>
                <NavLink to="/appointments">
                  <FaEdit />
                  {' '}
                  Book Appointment
                </NavLink>
              </li>
              )}
            { (token.isLoggedIn !== undefined && token.isLoggedIn)
              && (
              <li>
                <NavLink to="/myappointments">
                  <FaList />
                  {' '}
                  My Appointments
                </NavLink>
              </li>
              )}
            { (token.isLoggedIn !== undefined && token.isLoggedIn)
              && (
              <li>
                <NavLink onClick={handleLogOut}>
                  <FaSignOutAlt />
                  {' '}
                  Sign Out
                </NavLink>
              </li>
              )}
          </ul>
        </Col>
        <Col xs={12} md={10}>
          <Profile />
          <Splash />
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
