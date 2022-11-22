import React from 'react';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';
import insta from '../images2/insta-icon-home.png';
import fb from '../images2/fb-icon-home.png';
import twitter from '../images2/twitter-icon-home.png';

import "./Doctor.css"

const social = [
  { icon: insta },
  { icon: fb },
  { icon: twitter },
];


const DoctorList = () => {
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

  return (
    <Container>
      <Row>
        <Link to="/doctor" className="btn btn-details mt-4 text-center">Add Doctor</Link>
      </Row>
      <Row className="d-flex p-8">
      <Carousel
                  responsive={responsive}
                  className="carousel-container"
                  infinite
                >

        {
          doctors.map((doctor, index) => (
            <Col xs={4} key={uuid()} className="mt-5">
              
              <Link to={`/doctors/${index + 1}`}>
                <Card.Img className="border-0" variant="top" src={`https://finalcapstonedoctorappointment.herokuapp.com/images/${doctor.photo}`} alt={`Doctor ${doctor.name} photo`} />
                </Link>
             
              <Card className="border-0 mt-3 ">
                <Card.Body className="border-0">
                  <Card.Title className="doctor-name">{ doctor.name }</Card.Title>
                  <Card.Title className="doctor-specialization">{ doctor.specialization }</Card.Title>
                  <Card.Text className="doctor-bio">{ doctor.bio }</Card.Text>
                 
                  <div className="social-net">
        {social.map((item) => (
          <a href="/" key={item.icon}>
            <img src={item.icon} alt="social" className="w-8" />
          </a>
        ))}
      </div>
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
