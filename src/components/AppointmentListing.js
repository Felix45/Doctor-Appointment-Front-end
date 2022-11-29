import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { v4 as uuid } from 'uuid';
import { appointmentsFetchThunk, appointmentsDeleteThunk } from '../redux/slices/appointmentSlice';

const AppointmentListing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.token);
  const { doctors } = useSelector((state) => state.doctors);
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

  const doctorName = (doctorId) => {
    const doctor = doctors.find((doctor) => doctor.id === doctorId);
    return doctor.name;
  };

  return (
    <Row>
      <Col xs={12} className="d-flex flex-wrap">

        {
          appointments.map((appointment) => (
            <Col xs={12} md={6} key={uuid()}>
              <ul className="appointments" key={uuid()}>
                <ul>
                  <li><b>Doctors Name</b></li>
                  <li>{doctorName(appointment.doctor_id)}</li>
                </ul>
                <ul>
                  <li><b>Date</b></li>
                  <li>{appointment.date_of_appointment}</li>
                </ul>
                <ul>
                  <li><b>Time</b></li>
                  <li>{appointment.time_of_appointment}</li>
                </ul>
                <ul>
                  <li><b>Description</b></li>
                  <li>{appointment.description}</li>
                </ul>
                <ul>
                  <li><b>Patient</b></li>
                  <li>{token.username}</li>
                </ul>
                <ul className="d-flex justify-content-end">
                  <li><Button id={appointment.id} variant="danger" onClick={(e) => { handleDelete(e.target.id); }}>Cancel</Button></li>
                </ul>
              </ul>
            </Col>
          ))
        }
      </Col>
    </Row>
  );
};

export default AppointmentListing;
