import React from "react";
import { connect } from "react-redux";
import { signOut } from "../../../redux/actions/authActions";

const SignedInLinks = ({ signOut }) => {

  return (
    <div>
      <a 
        className="subtitle f4-ns link white hover-red mr4 mr4-m mr6-ns" 
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
