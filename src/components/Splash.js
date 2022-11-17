import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function Splash() {
  const location = useLocation();
  const { token } = useSelector((state) => state.token);

  return (
    <Container className="mt-2">
      <Row>
        {
            (!token.isLoggedIn && location.pathname === '/') && (
            <Col xs={12}>
              <ul className="mt-5 splash d-flex justify-content-center">
                <li><NavLink className="btn btn-primary mx-2" to="/login">Sign In</NavLink></li>
                <li><NavLink className="btn btn-primary" to="/signup">Sign Up</NavLink></li>
              </ul>
            </Col>
            )
        }
      </Row>
    </Container>
  );
}

export default Splash;
