import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Profile = () => {
  const { token } = useSelector((state) => state.token);

  return (
    <Container className="mt-2" fluid>
      <Row>
        <Col xs={12} className="d-flex justify-content-end">
          { token.isLoggedIn && <h4>{ `Hi, ${token.username}!` }</h4> }
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
