import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { FaUserPlus, FaSignInAlt } from 'react-icons/fa';
import { userSignInThunk } from '../redux/slices/loginSlice';

const Login = () => {
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
    <Form className="form mt-5 text-center" onSubmit={(e) => { handleSubmit(e); }}>
      <h2>Log in to your account</h2>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" className="rounded-pill p-3" placeholder="Enter your email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" className="rounded-pill p-3" placeholder="Enter your password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </Form.Group>

      <Form.Group>
        <Button type="submit" className="btn btn-block rounded-pill p-3">
          <FaSignInAlt />
          {' '}
          Sign In
        </Button>
      </Form.Group>
      <Col xs={12} className="mt-2 p-2">
        <Row>
          <div>
            Dont have an account ?
            <Link to="/signup">
              {' '}
              <FaUserPlus />
              {' '}
              Sign Up
            </Link>
          </div>
        </Row>
        <Row className="mt-3">
          { loginAttempt && <div className="alert alert-success">Log In</div> }
        </Row>
      </Col>
    </Form>
  );
}

export default Login;
