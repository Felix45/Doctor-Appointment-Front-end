import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { userSignInThunk } from '../redux/slices/loginSlice';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginAttempt, setLoginAttempt] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email !== '' && password !== '') {
      dispatch(userSignInThunk({ email, password }));
      setEmail('');
      setPassword('');
      setLoginAttempt(true);
    }
  };

  const { token } = useSelector((state) => state.token);
  useEffect(() => {
    if (token.isLoggedIn) navigate('/');
  }, [token, navigate]);

  return (
    <Form className="mt-5" onSubmit={(e) => { handleSubmit(e); }}>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter your email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter your password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </Form.Group>

      <Form.Group>
        <Button type="submit">Sign In</Button>
      </Form.Group>
      <Col xs={12} className="mt-2 p-2">
        <Row>
          { loginAttempt && <div className="alert alert-danger">Login not successful</div> }
        </Row>
      </Col>
    </Form>
  );
}

export default Login;
