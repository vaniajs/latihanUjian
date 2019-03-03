import React, { Component } from 'react';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'

import { Route } from 'react-router-dom'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
          <Navbar/>
          <Route path='/' component={Home} exact/>
          <Route path='/login' component={Login} exact/>
          <Route path='/register' component={Register} exact/>
      </div>
    );
  }
}

export default App;
