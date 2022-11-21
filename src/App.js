import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import SignUp from './components/SignUp';
import store from './redux/store';
import Login from './components/Login';
import Doctor from './components/Doctor';
import Appointment from './components/Appointment';
import AppointmentListing from './components/AppointmentListing';
import Dashboard from './Dashboard';
import DoctorList from './components/DoctorList';
import DoctorDetails from './components/DoctorDetails';

const persistor = persistStore(store);

function App() {
  return (
    <Router>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Routes>
            <Route path="/" element={<Dashboard />}>
              <Route exact path="signup" element={<SignUp />} />
              <Route exact path="login" element={<Login />} />
              <Route exact path="doctor" element={<Doctor />} />
              <Route exact path="doctors" element={<DoctorList />} />
              <Route exact path="doctors/:index" element={<DoctorDetails />} />
              <Route exact path="appointments" element={<Appointment />} />
              <Route exact path="myappointments" element={<AppointmentListing />} />
            </Route>
          </Routes>
        </PersistGate>
      </Provider>
    </Router>
  );
}

export default App;
