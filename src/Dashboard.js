import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Outlet } from 'react-router';
import { NavLink } from 'react-router-dom';

function Dashboard() {
  return (
    <Container>
      <Row>
        <Col xs={3}>
          <h1>Menu</h1>
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/signup">Sign Up</NavLink></li>
            <li><NavLink to="/login">Sign In</NavLink></li>
          </ul>
        </Col>
        <Col xs={9}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
