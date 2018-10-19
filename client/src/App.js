import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import setCurrentUser from './actions/setCurrentUser';

import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Check for token
if (localStorage.jwtToken) {
  //Set token to auth header
  setAuthToken(localStorage.jwtToken);
  //Decode token to get user info and expiration
  const decoded = jwtDecode(localStorage.jwtToken);
  //Set current user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
