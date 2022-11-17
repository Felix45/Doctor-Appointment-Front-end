import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { v4 as uuid } from 'uuid';
import { appointmentsCreateThunk } from '../redux/slices/appointmentSlice';

function Appointment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dateOfAppointment, setDate] = useState('');
  const [timeOfAppointment, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [createAppointment, setAppointment] = useState('');

  const { token } = useSelector((state) => state.token);
  const { appointment } = useSelector((state) => state.appointment);
  useEffect(() => {
    if (!token.isLoggedIn) navigate('/login');
    setAppointment(appointment.message);
  }, [token, navigate]);

  const doctors = [{ name: 'Dr. Felix Ouma', id: 1 }, { name: 'Dr. Silvia Tofana', id: 2 }];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dateOfAppointment !== '' && timeOfAppointment !== '' && description !== '' && doctorId !== '') {
      dispatch(appointmentsCreateThunk({
        date_of_appointment: dateOfAppointment,
        time_of_appointment: timeOfAppointment,
        description,
        doctor_id: doctorId,
        user_id: token.id,
      }));
      setDate('');
      setTime('');
      setDescription('');
    }
  };

  return (
    <Row>
      <Col xs={12}>
        <Form className="mt-5" onSubmit={(e) => { handleSubmit(e); }}>
          <Form.Group className="mb-3">
            <Form.Label>Select a docotor</Form.Label>
            <Form.Select aria-label="Default select example" onChange={(e) => setDoctorId(e.target.value)}>
              {
                doctors.map((doctor) => (
                  <option key={uuid()} value={doctor.id}>
                    {doctor.name}
                  </option>
                ))
              }
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date of Appointment</Form.Label>
            <Form.Control type="date" placeholder="Enter appointment date" name="date_of_appointment" value={dateOfAppointment} onChange={(e) => setDate(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Time of Appointment</Form.Label>
            <Form.Control type="time" placeholder="Enter time of appointment" name="time_of_appointment" value={timeOfAppointment} onChange={(e) => setTime(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>How are you feeling today</Form.Label>
            <Form.Control type="text" placeholder="Brief description..." name="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </Form.Group>

          <Form.Group>
            <Button type="submit">Book appointment</Button>
          </Form.Group>
        </Form>
      </Col>
      <Col xs={12} className="mt-2 p-2">
        <Row>
          { createAppointment && (
          <div className="alert alert-success">
            {' '}
            { createAppointment }
            {' '}
          </div>
          ) }
        </Row>
      </Col>
    </Row>
  );
}

export default Appointment;
