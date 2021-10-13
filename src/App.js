import React from "react";
import Particles from "react-particles-js";

import Navbar from "./components/navbar/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import "./App.css";

const particleOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 200,
      },
    },
    shape: {
      stroke: {
        width: 2,
        color: "#ffff00",
      },
    },
  },
};

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Particles className="particles" params={particleOptions} />
      <Dashboard />
    </div>
  );
};

export default App;
