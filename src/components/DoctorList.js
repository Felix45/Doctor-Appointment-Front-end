import React from 'react';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaEdit } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

const DoctorList = () => {
  const { token } = useSelector((state) => state.token);
  const { doctors } = useSelector((state) => state.doctors);
  return (
    <Container fluid>
      <Row>
        <Col xs={12} className="d-flex justify-content-end">
          { (token.isLoggedIn !== undefined && token.isLoggedIn && token.role === 'admin') && (
          <Link to="/doctor" className="btn btn-primary btn-sm my-4 text-center">
            <FaEdit />
            {' '}
            Add Doctor
          </Link>
          ) }
        </Col>
      </Row>
      <Row className="d-flex">
        {
          doctors.map((doctor, index) => (
            <Col xs={4} key={uuid()} className="mb-4">
              <Card>
                <Link to={`/doctors/${index + 1}`}>
                  <Card.Img variant="top" src={`https://finalcapstonedoctorappointment.herokuapp.com/images/${doctor.photo}`} alt={`Doctor ${doctor.name} photo`} />
                </Link>
                <Card.Body>
                  <Card.Title>{ doctor.name }</Card.Title>
                  <Card.Title>{ doctor.specialization }</Card.Title>
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
