import { updateProfile } from "@firebase/auth";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";
const Profile = ({refreshUser, userObj}) => {
    const hestory = useHistory();
    //Show User Name ,This Hulp Us Change user Name
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick=()=>{
        auth.signOut();
        hestory.push("/");
    }

    //Update The User Name{
    const onChange = (event) => {
      const {
        target: { value },
      } = event;
      setNewDisplayName(value);
    };
    const onSubmit = async (event) => {
      event.preventDefault();
      if(userObj.displayName !== newDisplayName){
        await updateProfile(auth.currentUser, { displayName: newDisplayName });
        refreshUser();//react and Firebase Auto detect Change and User_Name currently
        }
    };

    //Update The User Name} Akan Teke Sobi O Change Kora Jay




    //This Area Use For Use See Ther All Tweet......

    // const getMyNweets = async () => {
    //   const q = query(
    //   collection(dbService, "nweets"),
    //   where("creatorId", "==", userObj.uid)
    //   );
    //   const querySnapshot = await getDocs(q);
    //   querySnapshot.forEach((doc) => {
    //   console.log(doc.id, " => ", doc.data());
    //   });
    //   };
    // useEffect(() => {
    //   getMyNweets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);
  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          type="text"
          autoFocus
          placeholder="Display name"
          value={newDisplayName}
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  )
};

export default Profile;
