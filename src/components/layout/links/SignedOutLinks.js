import React from "react";
import { NavLink } from "react-router-dom";

const SignedOutLinks = () => {
  return (
    <div>
      <NavLink className="subtitle f4-ns link white hover-yellow mr3 mr4-m mr5-ns" to="/signin" >Login</NavLink>
      <NavLink className="subtitle f4-ns link white hover-yellow mr3 mr4-m mr5-ns" to="/signup" >Register</NavLink>
    </div>
  )
}

export default SignedOutLinks;
