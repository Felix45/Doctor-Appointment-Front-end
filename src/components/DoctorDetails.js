import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const DoctorDetails = () => {
  const { state: { doctor } } = useLocation();
  return (
    <div>
      <Link to="/">
        <button><FaArrowLeft /></button>
      </Link>
      <div>
        <div>
          <h2> Doctor Name</h2>
          <h3>{doctor.name}</h3>
        </div>
        <div>
          <div>
            <h2>Doctor Biography</h2>
            <p>{doctor.bio}</p>
            <h2>Doctor Specialization</h2>
            <p>{doctor.specialization}</p>
          </div>
          <div>
            <h2>Doctor Avaliability</h2>
            <p>{doctor.avaliability}</p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
