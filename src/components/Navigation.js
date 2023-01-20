/* eslint-disable jsx-a11y/alt-text */
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faBell, faEnvelope, faHashtag, faHome, faList, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({userObj}) => {
  return(
  <div className="Navigation">
    <div className="NavMenu">
      <span>
        <Link to="/">
          <FontAwesomeIcon icon={faHome} color={"rgb(214, 217, 219)"} size="1x" />
        </Link>
      </span>
      <span>
        <Link to="/">
          <FontAwesomeIcon icon={faSearch} color={"rgb(214, 217, 219)"} size="1x" />
        </Link>
      </span>
      <span>
        <Link to="/">
          <FontAwesomeIcon icon={faEnvelope} color={"rgb(214, 217, 219)"} size="1x" />
        </Link>
      </span>
      <span>
        <Link to="/">
          <FontAwesomeIcon icon={faBell} color={"rgb(214, 217, 219)"} size="1x" />
        </Link>
      </span>
    </div>
    <nav>
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