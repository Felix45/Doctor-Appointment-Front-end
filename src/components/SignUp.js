import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { userSignUpThunk } from '../redux/slices/authSlice';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [alert, setAlert] = useState('');
  const [confirmation, setPasswordConfirm] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (name !== '' && email !== '' && password === confirmation) {
      dispatch(userSignUpThunk({
        name, email, password, password_confirmation: confirmation,
      }));
      setName('');
      setEmail('');
      setPassword('');
      setPasswordConfirm('');
      setAlert('alert-success');
      setMessage('Registration was successful');
      navigate('/login');
    } else {
      setAlert('alert-danger');
      setMessage('An error occured while registering the user');
    }
  };

  const { token } = useSelector((state) => state.token);
  useEffect(() => {
    if (token.isLoggedIn) navigate('/');
  }, [token, navigate]);

  return (
    <Form className="form mt-5" onSubmit={(e) => { handleSubmit(e); }}>
      <h2 className="text-center">Create an account</h2>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" className="rounded-pill p-3" placeholder="Enter your name" name="name" minLength="3" value={name} onChange={(e) => setName(e.target.value)} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" className="rounded-pill p-3" placeholder="Enter your email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" className="rounded-pill p-3" placeholder="Enter your password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Confirm password</Form.Label>
        <Form.Control type="password" className="rounded-pill p-3" placeholder="Enter your password" name="password_confirmation" value={confirmation} onChange={(e) => setPasswordConfirm(e.target.value)} required />
      </Form.Group>

      <Form.Group className="text-center">
        <Button type="submit" className="rounded-pill p-3">
          <FaUserPlus className="fa-lg mx-2" />
          Sign Up
        </Button>
      </Form.Group>
      <Col xs={12} className="mt-2 p-2">
        <Row className="text-center">
          <div>
            Already have an account ?
            <Link to="/login">
              {' '}
              <FaSignInAlt />
              {' '}
              Sign In
            </Link>
          </div>
        </Row>
        <Row>
          <div className={`alert ${alert}`}>{message}</div>
        </Row>
      </Col>
    </Form>
  );
};

export default SignUp;
