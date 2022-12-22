import React from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";
const Profile = (props) => {
    const hestory = useHistory();
    const onLogOutClick=()=>{
        auth.signOut();
        hestory.push("/");
    }
  return (
    <div>
      <button onClick={onLogOutClick}>Log Out</button>
    </div>
  )
};

export default Profile;
