/* eslint-disable jsx-a11y/alt-text */
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faBell, faEnvelope, faHashtag, faHome, faList, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navigation = ({userObj}) => {
  const [navd, setnavd] = useState(() => {
    // eslint-disable-next-line no-restricted-globals
    let width = screen.width;
    if (width > 600) {
      return "block";
    }
    return "none";
  });
  function navShow() {
    if (navd === "none") {
      setnavd("block");
    } else {
      setnavd("none");
    }
  }
  const myComponentStyle = {
    display: navd,
 }
 console.log(navd);
  return(
  <div className="Navigation">
    <button onClick={navShow} className="NavMenu" >Menu</button>
    <nav style={myComponentStyle}>
      <ul>
          <Link to="/">
          <div id="homeIcon">
            <FontAwesomeIcon icon={faTwitter} color={"rgb(214, 217, 219)"} size="2x" />
          </div>
          </Link>
        <li style={{ marginTop:30 }}>
          <Link to="/">
          <div className="NavIcon">
            <FontAwesomeIcon icon={faHome} color={"rgb(214, 217, 219)"} size="2x" />
          </div>
          <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/">
          <div className="NavIcon">
            <FontAwesomeIcon icon={faHashtag} color={"rgb(214, 217, 219)"} size="2x" />
          </div>
          <span>Explore</span>
          </Link>
        </li>
        <li>
          <Link to="/">
          <div className="NavIcon">
            <FontAwesomeIcon icon={faBell} color={"rgb(214, 217, 219)"} size="2x" />
          </div>
          <span>Notifications</span>
          </Link>
        </li>
        <li>
          <Link to="/">
          <div className="NavIcon">
            <FontAwesomeIcon icon={faEnvelope} color={"rgb(214, 217, 219)"} size="2x" />
          </div>
          <span>Messages</span>
          </Link>
        </li>
        
        <li>
          <Link to="/profile">
          <div className="NavIcon">
            <FontAwesomeIcon icon={faUser} color={"rgb(214, 217, 219)"} size="2x" />
          </div>
          <span>Profile</span>
          </Link>
        </li>
        <li>
          <Link to="/">
          <div className="NavIcon">
            <FontAwesomeIcon icon={faList} color={"rgb(214, 217, 219)"} size="2x" />
          </div>
          <span>More</span>
          </Link>
        </li>
        <div className="TopTweet">
          <Link to="/">
          <span>Tweet</span>
          </Link>
        </div>
        <Link to="/profile"> 
          <div className="NaveBotttom">
            <span>
              {userObj.photoURL
                ? <img className="ProfilePicture" src={userObj.photoURL} />
                : <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />}
            </span>
            <h1>
              {userObj.displayName
                ? `@${userObj.displayName} Profile`
                : "Profile"}
            </h1>
          </div>
        </Link>
      </ul>
    </nav>
  </div>
)
};
export default Navigation;