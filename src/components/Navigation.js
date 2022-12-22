import React from "react";
import { Link } from "react-router-dom";

const Navigation = (props) => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/Profile">Profile</Link></li>
      </ul>
    </nav>
  )
};

export default Navigation;
