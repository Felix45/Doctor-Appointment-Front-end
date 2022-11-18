import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { v4 as uuid } from 'uuid';
import { appointmentsFetchThunk, appointmentsDeleteThunk } from '../redux/slices/appointmentSlice';

function AppointmentListing() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.token);
  const { appointments } = useSelector((state) => state.appointments);
  useEffect(() => {
    if (!token.isLoggedIn) navigate('/login');
    dispatch(appointmentsFetchThunk(token));
  }, [token, navigate]);

  const handleDelete = (appointmentId) => {
    Promise.resolve(dispatch(appointmentsDeleteThunk({ token, appointmentId }))).then(
      () => dispatch(appointmentsFetchThunk(token)),
    );
  };

  return (
    <Row>
      <Col xs={12}>
        <Table className="mt-5" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Description</th>
              <th>Patient</th>
            </tr>
          </thead>
          <tbody>
            {
                appointments.map((appointment) => (
                  <tr key={uuid()}>
                    <td>{appointment.doctor_id}</td>
                    <td>{appointment.date_of_appointment}</td>
                    <td>{appointment.time_of_appointment}</td>
                    <td>{appointment.description}</td>
                    <td>{token.username}</td>
                    <td><Button id={appointment.id} variant="danger" onClick={(e) => { handleDelete(e.target.id); }}>Delete</Button></td>
                  </tr>
                ))
            }
          </tbody>
        </Table>
      </Col>
    </Row>
  );
}

export default AppointmentListing;
