import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  FaUserPlus, FaSignInAlt, FaList, FaEdit, FaSignOutAlt, FaHome,
} from 'react-icons/fa';
import { logout } from '../redux/slices/loginSlice';
import Login from './Login';

const NavMenu = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);

  const handleLogOut = () => {
    dispatch(logout());
    return <Login />;
  };

  return (
    <Navbar bg="light" expand="lg" className="mobile-menu">
      <Container>
        <Navbar.Brand href="/">Doctors Appointment</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/">
              <FaHome className="mx-2" />
              Home
            </Link>
            { (token.isLoggedIn === undefined || !token.isLoggedIn) && (
              <Link to="/signup">
                <FaUserPlus className="mx-2" />
                {' '}
                Sign Up
              </Link>
            ) }
            { (token.isLoggedIn === undefined || !token.isLoggedIn) && (
            <li>
              <Link to="/login">
                <FaSignInAlt className="mx-2" />
                {' '}
                Sign In
              </Link>
            </li>
            ) }
            { (token.isLoggedIn !== undefined && token.isLoggedIn && token.role === 'admin')
              && (
                <Link to="/doctor">
                  <FaEdit className="mx-2" />
                  {' '}
                  Add Doctor
                </Link>
              )}
            { (token.isLoggedIn !== undefined && token.isLoggedIn)
              && (
                <Link to="/doctors/">
                  <FaList className="mx-2" />
                  {' '}
                  Doctors
                </Link>
              )}
            { (token.isLoggedIn !== undefined && token.isLoggedIn)
              && (
                <Link to="/appointments">
                  <FaEdit className="mx-2" />
                  {' '}
                  Book Appointment
                </Link>
              )}
            { (token.isLoggedIn !== undefined && token.isLoggedIn)
              && (
                <Link to="/myappointments">
                  <FaList className="mx-2" />
                  {' '}
                  My Appointments
                </Link>
              )}
            { (token.isLoggedIn !== undefined && token.isLoggedIn)
              && (
                <NavLink onClick={handleLogOut}>
                  <FaSignOutAlt className="mx-2" />
                  {' '}
                  Sign Out
                </NavLink>
              )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavMenu;
