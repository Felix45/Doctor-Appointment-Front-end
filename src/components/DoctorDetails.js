import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
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
        <Link to="/">
          <span>
            Home
            <FaArrowLeft />
          </span>
        </Link>
        <Col xs={12}>
          <Card>
            <Card.Img variant="top" src={doctor.photo} alt={`Doctor ${doctor.name} photo`} />
            <Card.Body>
              <Card.Title>{ doctor.name }</Card.Title>
              <Card.Title>{ doctor.specialization }</Card.Title>
              <Card.Text>{ doctor.bio }</Card.Text>
              <div>
                <Link to={`DoctorDetails/${index + 1}`}><span><FaArrowRight /></span></Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DoctorDetails;
