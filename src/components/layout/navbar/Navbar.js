import React from "react";
import "./Navbar.css";
import { connect } from "react-redux";

import SignedInLinks from "../links/SignedInLinks";
import SignedOutLinks from "../links/SignedOutLinks";


const Navbar = ({ isUserSignedIn }) => {
  const isSignedIn = JSON.parse(localStorage.getItem("authUser"))
  const navLinks = (isSignedIn || isUserSignedIn) ? <SignedInLinks /> : <SignedOutLinks />

  return (
    <nav className="dt ba b--white-50 bg-white-50 w-100 border-box shadow-5">
      <a className="dtc link white w-25" href="/" >
        <h3 className="title yellow" >Who-Am-I</h3>
      </a>
      <div className="dtc v-mid w-75 tr">
        {navLinks}
      </div>
    </nav>
  )
}

const mapStateToProps = (state) => {
  return {
    isUserSignedIn: state.auth.isUserSignedIn
  }
};

export default connect(mapStateToProps)(Navbar);
