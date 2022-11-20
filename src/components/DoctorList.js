import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const DoctorList = ({ doctor }) => {
  const { id } = doctor;
  //  const avatar = "data:image/jpeg;base64,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"

  return (
    <>
      <Link to="/inputForm" className="btn-details btn mt-4 text-center">Add Doctor</Link>

      <div className="mainContainer">
        <div className="container ">
          <Link to={`DoctorDetails/${id}`} state={{ doctor }}>
            <button><FaArrowRight /></button>
          </Link>
          <div className="cardStyle">
            <img src={doctor.photo} alt="doctor" />
            <h3>
              {doctor.name}
              {' '}
            </h3>
            <p>
              Biography:
              {doctor.bio}
            </p>

          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorList;
