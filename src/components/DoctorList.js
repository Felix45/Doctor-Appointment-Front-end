import React from 'react';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';
import { FaEdit, FaDelete } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';
import insta from '../images/insta-icon-home.png';
import fb from '../images/fb-icon-home.png';
import twitter from '../images/twitter-icon-home.png';
import { doctorsFetchThunk, doctorsDeleteThunk } from '../redux/slices/doctorSlice';



const social = [
  { icon: insta },
  { icon: fb },
  { icon: twitter },
];

const DoctorList = () => {
  const { token } = useSelector((state) => state.token);
  const { doctors } = useSelector((state) => state.doctors);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    laptop: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const handleDelete = (doctorId) => {
    Promise.resolve(dispatch(doctorsDeleteThunk({ token, doctorId }))).then(
      () => dispatch(doctorsFetchThunk(token)),
    );

  }

  return (
    <Container fluid>
      <Row>
        <Col xs={12} className="d-flex justify-content-end">
          { (token.isLoggedIn !== undefined && token.isLoggedIn && token.role === 'admin') && (
          <Link to="/doctor" className="btn btn-primary btn-sm my-4 text-center">
            <FaEdit />
            {' '}
            Add Doctor
          </Link>
          ) }
        </Col>
      </Row>
      <Row className="d-flex p-8">
        <Carousel
          responsive={responsive}
          className="carousel-container"
          infinite
        >

          {
          doctors.map((doctor, index) => (
            <Col xs={12} md={12} key={uuid()} className="mt-5 doctor d-flex flex-column justify-content-around">

              <Link to={`/doctors/${index + 1}`}>
                <Card.Img className="border-0 rounded-pill" variant="top" src={`https://finalcapstonedoctorappointment.herokuapp.com/images/${doctor.photo}`} alt={`Doctor ${doctor.name} photo`} />
              </Link>

              <Card className="border-0 mt-3 text-center">
                <Card.Body className="border-0">
                  <Card.Title className="doctor-name"><b>{ doctor.name }</b></Card.Title>
                  <Card.Title className="doctor-specialization"><b>{ doctor.specialization }</b></Card.Title>
                  <Card.Text className="doctor-bio">{ doctor.bio }</Card.Text>

                  <div className="social-net">
                    {social.map((item) => (
                      <a href="/" key={item.icon}>
                        <img src={item.icon} alt="social" className="w-8" />
                      </a>
                    ))}
                  </div>
                  <button className="deleteDoctor" type="button"><FaDelete/></button>
                </Card.Body>
              </Card>
            </Col>
          ))
      }
        </Carousel>
      </Row>
    </Container>
  );
};

export default DoctorList;
