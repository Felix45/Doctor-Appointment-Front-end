import React from 'react';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

const DoctorList = () => {
  const { doctors } = useSelector((state) => state.doctors);
  return (
    <Container>
      <Row>
        <Link to="/doctor" className="btn btn-details mt-4 text-center">Add Doctor</Link>
      </Row>
      <Row className="d-flex">
        {
          doctors.map((doctor, index) => (
            <Col xs={4} key={uuid()}>
              <Card>
                <Card.Img variant="top" src={`https://finalcapstonedoctorappointment.herokuapp.com/images/${doctor.photo}`} alt={`Doctor ${doctor.name} photo`} />
                <Card.Body>
                  <Card.Title>{ doctor.name }</Card.Title>
                  <Card.Title>{ doctor.specialization }</Card.Title>
                  <Card.Text>{ doctor.bio }</Card.Text>
                  <div>
                    <Link to={`/doctors/${index + 1}`}><span><FaArrowRight /></span></Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
      }
      </Row>
    </Container>
  );
};

export default DoctorList;
