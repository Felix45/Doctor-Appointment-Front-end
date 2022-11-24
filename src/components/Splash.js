import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import DoctorList from './DoctorList';

const Splash = () => {
  const location = useLocation();
  const { token } = useSelector((state) => state.token);

  return (
    <Container className="mt-2" fluid>
      <Row>
        {
            (!token.isLoggedIn && location.pathname === '/') && (
              <DoctorList />
            )
        }

        {
            (token.isLoggedIn && location.pathname === '/') && (
              <DoctorList />
            )
        }

      </Row>
    </Container>
  );
};

export default Splash;
