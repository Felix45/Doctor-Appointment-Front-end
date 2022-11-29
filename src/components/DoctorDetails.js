import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';

const DoctorDetails = () => {
  const { index } = useParams();
  const { doctors } = useSelector((state) => state.doctors);
  const doctor = doctors[parseInt(index, 10) - 1];

  return (
    <Container>
      <Row className="mb-3">
        <Link to="/doctors" className="text-primary">
          <span>
            <FaArrowLeft className="mx-2" />
            All Doctors
          </span>
        </Link>
      </Row>
      <Row className="d-flex">
        <Col xs={12} md={5}>
          <Card className="mb-4 p-3">
            <Card.Img variant="top" src={`https://finalcapstonedoctorappointment.herokuapp.com/images/${doctor.photo}`} alt={`Doctor ${doctor.name} photo`} />
          </Card>
        </Col>
        <Col xs={12} md={5}>
          <Card.Body>
            <Card.Title>{ doctor.name }</Card.Title>

            <div>
              <Table className="mt-5" striped bordered hover size="sm">
                <tbody>
                  <tr>
                    <th>Speciality</th>
                    <td>{ doctor.specialization }</td>
                  </tr>
                  <tr>
                    <th>Bio</th>
                    <td>{ doctor.bio }</td>
                  </tr>
                  <tr>
                    <th>See Dcotor</th>
                    <td className="d-flex justify-content-end"><Link to="/appointments" className="btn btn-primary">Book Appointment</Link></td>
                  </tr>
                </tbody>
              </Table>
              <Link to="/doctors" className="text-primary">
                <span>
                  <FaArrowLeft />
                  {' '}
                  Back
                </span>
              </Link>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Container>
  );
};

export default DoctorDetails;
