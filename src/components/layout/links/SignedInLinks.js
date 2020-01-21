import React from "react";
import { connect } from "react-redux";
import { signOut } from "../../../redux/actions/authActions";

const SignedInLinks = ({ signOut }) => {

  return (
    <div>
      <a 
        className="subtitle link white hover-red mr3 mr4-ns" 
        href="/"
        onClick={signOut} >Logout</a>
    </div>
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
};

export default connect(null, mapDispatchToProps)(SignedInLinks);
