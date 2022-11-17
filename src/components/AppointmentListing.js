import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { v4 as uuid } from 'uuid';
import { appointmentsFetchThunk } from '../redux/slices/appointmentSlice';

function AppointmentListing () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createAppointment, setAppointment] = useState('');

  const { token } = useSelector((state) => state.token);
  const { appointments } = useSelector((state) => state.appointments);
  useEffect(() => {
    if (!token.isLoggedIn) navigate('/login');
    dispatch(appointmentsFetchThunk());
  }, [token, navigate]);

   const handleDelete = (e) => {
   e.preventDefault();
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
            {
                appointments.map((appointment) => ( <tr key={uuid()}>
                    <td>{appointment.doctor_id}</td>
                    <td>{appointment.date_of_appointment}</td>
                    <td>{appointment.time_of_appointment}</td>
                    <td>{appointment.description}</td>
                    <td>{appointment.user_id}</td>
                    <td><Button id={appointment.id} variant="danger" onClick={(e) => { handleDelete(e.target.id); }}>Delete</Button></td>
                </tr>))
            }
        </Table>
      </Col>
    </Row>
  );
};

export default AppointmentListing;
