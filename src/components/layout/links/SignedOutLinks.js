import React from "react";
import { NavLink } from "react-router-dom";

const SignedOutLinks = () => {
  return (
    <div>
      <NavLink className="subtitle link white hover-yellow mr3 mr4-ns" to="/signin" >Login</NavLink>
      <NavLink className="subtitle link white hover-yellow mr3 mr4-ns" to="/signup" >Register</NavLink>
    </div>
  )
}

export default SignedOutLinks;