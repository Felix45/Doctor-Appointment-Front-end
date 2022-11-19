import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { doctorsCreateThunk, doctorsFetchThunk } from '../redux/slices/doctorSlice';

function Doctor() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [avaliability, setAvailability] = useState('');
  const [photo, setPhoto] = useState('');

  const { token } = useSelector((state) => state.token);
  useEffect(() => {
    if (!token.isLoggedIn) navigate('/login');
  }, [token, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAvailability('Y');

    if (name !== '' && bio !== '' && specialization !== '' && avaliability !== '') {
      const doctor = {
        name, bio, specialization, avaliability, photo, token: token.token,
      };

      Promise.resolve(dispatch(doctorsCreateThunk(doctor))).then(
        () => dispatch(doctorsFetchThunk()),
      );

      setBio('');
      setName('');
      setPhoto('');
      setAvailability('');
      setSpecialization('');
    }
  };

  return (
    <Row>
      <Col xs={12}>
        <Form className="mt-5" onSubmit={(e) => { handleSubmit(e); }}>
          <Form.Group className="mb-3">
            <Form.Label>Doctors Name</Form.Label>
            <Form.Control type="text" placeholder="Enter doctors name" name="doctor" value={name} onChange={(e) => setName(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Specialization</Form.Label>
            <Form.Control type="text" placeholder="Enter docotor specialization" name="specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Doctors Bio</Form.Label>
            <Form.Control type="text" placeholder="Brief description..." name="description" value={bio} onChange={(e) => setBio(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Doctors Photo</Form.Label>
            <Form.Control type="url" placeholder="Enter doctor's photo" name="photo" value={photo} onChange={(e) => setPhoto(e.target.value)} required />
          </Form.Group>

          <Form.Group>
            <Button type="submit">Create Doctor</Button>
          </Form.Group>
        </Form>
      </Col>
      <Col xs={12} className="mt-2 p-2" />
    </Row>
  );
}

export default Doctor;
