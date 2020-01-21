import React, { useEffect } from 'react';
import './App.css';
import Particles from "react-particles-js";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "./components/layout/navbar/Navbar";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Dashboard from "./components/dashboard/Dashboard";
import Gallery from "./components/dashboard/gallery/Gallery";

import { connect } from "react-redux";
import { authCheck } from "./redux/actions/authActions";

const particleOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 200
      }
    },
    shape: {
      stroke: {
        width: 2,
        color: "#ffff00"
      }
    }
  }
}

const App = ({ authCheck }) => {

  useEffect(() => {
    authCheck()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Particles className="particles" params={particleOptions} />
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/gallery" component={Gallery} />
        </Switch>
      </div>
    </BrowserRouter>
    );
};

const mapDispatchToProps = (dispatch) => {
  return {
    authCheck: () => dispatch(authCheck())
  }
};

export default connect(null, mapDispatchToProps)(App);