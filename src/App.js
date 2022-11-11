import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import store from './redux/store';
import Login from './components/Login';
import Dashboard from './Dashboard';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route exact path="signup" element={<SignUp />} />
            <Route exact path="login" element={<Login />} />
          </Route>
        </Routes>
      </Provider>
    </Router>
  );
}

export default App;
