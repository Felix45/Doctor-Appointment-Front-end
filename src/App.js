import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import SignUp from './components/SignUp';
import store from './redux/store';
import Login from './components/Login';
import Appointment from './components/Appointment';
import Dashboard from './Dashboard';

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
              <Route exact path="appointments" element={<Appointment />} />
            </Route>
          </Routes>
        </PersistGate>
      </Provider>
    </Router>
  );
}

export default App;
