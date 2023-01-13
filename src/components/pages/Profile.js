/* eslint-disable jsx-a11y/alt-text */
import { updateProfile } from "@firebase/auth";
//Start add for Profile Picture
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { v4 as uuidv4 } from 'uuid';
//End add for Profile Picture
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth, storageService } from "../../firebase";
const Profile = ({refreshUser, userObj}) => {
    const hestory = useHistory();
    //Show User Name ,This Hulp Us Change user Name
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const [attachment, setAttachment] = useState("");//for profile picture
    //log Out Function
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
      //Start add for Profile Picture
      let photoURL = "";
        if(attachment !==""){ //This Area Use for "Images Add Tweet" "{uuid} give random id"
          const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
          const response = await uploadString(attachmentRef, attachment, "data_url");
          photoURL = await getDownloadURL(response.ref);
        }
      //End add for Profile Picture


      if(userObj.displayName !== newDisplayName || userObj.photoURL !== attachment){
        await updateProfile(auth.currentUser,
          { displayName: newDisplayName,
            photoURL: photoURL //this line profile Picture
          });
        refreshUser();//react and Firebase Auto detect Change and User_Name currently
        }
    };

    //Update The User Name} Akan Teke Sobi O Change Kora Jay


    //Add a Photo for this profile
    const onFileChange = (event) => {
      const {
        target: { files },
      } = event;
      const theFile = files[0];
      const reader = new FileReader();
      reader.onloadend = (finishedEvent) => {
        const {
          currentTarget: { result },
        } = finishedEvent;
        setAttachment(result);
      };
      reader.readAsDataURL(theFile);
    };
    //Clear this Attacment
    const onClearAttachment = () => setAttachment(null);
  return (
    <div className="Profile_Container">
      <h1>Edit Your Profile</h1>
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          type="text"
          autoFocus
          placeholder="Display name"
          value={newDisplayName}
          className="formInput"
        />
        

        {/* Start profile Photo Add This Section */}
        <label for="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <div className="Edit_Pro_pic">
          {userObj.photoURL
              ? <img className="Edit_Pro_img" src={userObj.photoURL} />
              : <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />}
          </div>
      </label>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{
          opacity: 0,
        }}
      />
      {attachment && (
        <div className="factoryForm__attachment">
          <img
            src={attachment}
            style={{
              backgroundImage: attachment,
            }}
          />
          <div className="factoryForm__clear" onClick={onClearAttachment}>
            <span>Remove</span>
          </div>
        </div>
      )}

      {/* End Profile Photo Add */}
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
