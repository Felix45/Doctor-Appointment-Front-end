import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

const DoctorDetails = () => {
  const { index } = useParams();
  const { doctors } = useSelector((state) => state.doctors);
  const doctor = doctors[parseInt(index, 10) - 1];

  return (
    <Container>
      <Row>
        <Link to="/doctors">
          <span>
            <FaArrowLeft />
            All Doctors
          </span>
        </Link>
      </Row>
      <Row className="d-flex">
        <Col xs={12}>
          <Card>
            <Card.Img variant="top" src={`https://finalcapstonedoctorappointment.herokuapp.com/images/${doctor.photo}`} alt={`Doctor ${doctor.name} photo`} />
            <Card.Body>
              <Card.Title>{ doctor.name }</Card.Title>
              <Card.Title>{ doctor.specialization }</Card.Title>
              <Card.Text>{ doctor.bio }</Card.Text>
              <div>
                <Link to="/doctors"><span><FaArrowLeft /></span></Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DoctorDetails;
