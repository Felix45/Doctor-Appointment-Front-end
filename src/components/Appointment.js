import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { v4 as uuid } from 'uuid';
import { appointmentsCreateThunk, appointmentsFetchThunk } from '../redux/slices/appointmentSlice';

function Appointment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dateOfAppointment, setDate] = useState('');
  const [timeOfAppointment, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [doctorId, setDoctorId] = useState('');

  const { token } = useSelector((state) => state.token);
  const { doctors } = useSelector((state) => state.doctors);

  useEffect(() => {
    if (!token.isLoggedIn) navigate('/login');
  }, [token, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dateOfAppointment !== '' && timeOfAppointment !== '' && description !== '' && doctorId !== '') {
      const appointment = {
        date_of_appointment: dateOfAppointment,
        time_of_appointment: timeOfAppointment,
        description,
        doctor_id: doctorId,
        user_id: token.id,
        token: token.token,
      };
      Promise.resolve(dispatch(appointmentsCreateThunk(appointment))).then(
        () => dispatch(appointmentsFetchThunk()),
      );

      setDate('');
      setTime('');
      setDescription('');
    }
  };

  return (
    <Row className="apt-col">
      <Col xs={12}>
        <Form className="appointment-form mt-5" onSubmit={(e) => { handleSubmit(e); }}>
          <Form.Group className="mb-3">
            <Form.Label className=" text-white "><b>Select a doctor</b></Form.Label>
            <Form.Select className="rounded-pill" aria-label="Default select example" value={doctorId} onChange={(e) => setDoctorId(e.target.value)}>
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
            <Form.Label className=" text-white "><b>Date of Appointment</b></Form.Label>
            <Form.Control type="date" placeholder="Enter appointment date" name="date_of_appointment" value={dateOfAppointment} onChange={(e) => setDate(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className=" text-white "><b>Time of Appointment</b></Form.Label>
            <Form.Control type="time" placeholder="Enter time of appointment" name="time_of_appointment" value={timeOfAppointment} onChange={(e) => setTime(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className=" text-white "><b>How are you feeling today</b></Form.Label>
            <Form.Control type="text" placeholder="Brief description..." name="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </Form.Group>

          <Form.Group>
            <Button type="submit"><b>Book appointment</b></Button>
          </Form.Group>
        </Form>
      </Col>
      <Col xs={12} className="mt-2 p-2" />
    </Row>
  );
}

export default Appointment;
