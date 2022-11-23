import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
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
  const [gender, setGender] = useState('M');
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

    if (name !== '' && bio !== '' && specialization !== '' && avaliability !== '' && gender !== '') {
      const doctor = {
        name, bio, specialization, avaliability, photo, gender, token: token.token,
      };

      Promise.resolve(dispatch(doctorsCreateThunk(doctor))).then(
        () => dispatch(doctorsFetchThunk()),
      );

      setBio('');
      setName('');
      setPhoto('');
      setGender('');
      setAvailability('');
      setSpecialization('');
    }
  };

  return (
    <Row className="apt-col">
      <Col xs={12}>
        <Form className="appointment-form mt-5" onSubmit={(e) => { handleSubmit(e); }}>
          <Form.Group className="mb-3">
            <Form.Label className=" text-white "><b>Doctors Name</b></Form.Label>
            <Form.Control type="text" placeholder="Enter doctors name" name="doctor" value={name} onChange={(e) => setName(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className=" text-white "><b>Select gender</b></Form.Label>
            <Form.Select className="rounded-pill" aria-label="Default select example" onChange={(e) => setGender(e.target.value)}>
              <option value="M" key={uuid()}>Male</option>
              <option value="F" key={uuid()}>Female</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className=" text-white "><b>Specialization</b></Form.Label>
            <Form.Control type="text" placeholder="Enter docotor specialization" name="specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className=" text-white "><b>Doctors Bio</b></Form.Label>
            <Form.Control type="text" placeholder="Brief description..." name="description" value={bio} onChange={(e) => setBio(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className=" text-white "><b>Doctors Photo</b></Form.Label>
            <Form.Control type="text" placeholder="Enter doctor's photo" name="photo" value={photo} onChange={(e) => setPhoto(e.target.value)} required />
          </Form.Group>

          <Form.Group>
            <Button type="submit"><b>Create Doctor</b></Button>
          </Form.Group>
        </Form>
      </Col>
      <Col xs={12} className="mt-2 p-2" />
    </Row>
  );
}

export default Doctor;
