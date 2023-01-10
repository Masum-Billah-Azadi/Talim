/* eslint-disable jsx-a11y/alt-text */
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import classes from "./Styles/Nav.module.css";

const Navigation = ({userObj}) => {
  
  return(
  <>
    <nav className={classes.nav}>
      <ul>
        <li>
          <Link to="/" style={{ marginRight: 10 }}>
          <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
          </Link>
        </li>
        <li>
        <Link
            to="/profile"
            style={{
              marginLeft: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontSize: 12,
            }}
          > 
            <span>
              {userObj.photoURL
                ? <img className="ProfilePicture" src={userObj.photoURL} />
                : <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />}
            </span>
            <span style={{ marginTop: 10 }}>
              {userObj.displayName
                ? `${userObj.displayName} Profile`
                : "Profile"}
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  </>
)
};
export default Navigation;