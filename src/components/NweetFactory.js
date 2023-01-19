/* eslint-disable jsx-a11y/alt-text */
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { faClock, faGift, faImage, faList, faLocationArrow, faSmile, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { dbService, storageService } from "../firebase";

const NweetFactory = ({ userObj }) => {
    const [attachment, setAttachment] = useState("");
    const [nweet, setNweet] = useState("");
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
        let attachmentUrl = "";
        if(attachment !==""){ //This Area Use for "Images Add Tweet" "{uuid} give random id"
          const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
          const response = await uploadString(attachmentRef, attachment, "data_url");
          attachmentUrl = await getDownloadURL(response.ref);
        }
        const docRef = await addDoc(collection(dbService, "nweets" ), {
        text:nweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        userId: userObj.displayName ? userObj.displayName : "User_Name",
        userImage: userObj.photoURL !== null ? userObj.photoURL : "User_Icon",
        attachmentUrl,
        });
        console.log(" Document written with ID: ", docRef.id);
        } catch (error) {
        console.error(" Error adding document: ", error);
        }
        
        setNweet("");
        setAttachment("");
        };
        const onChange = ({ target: { value } })=>{
        setNweet(value);
        };
        //Add a Photo for this nweet
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
  <div className="TalemPost">
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
            <span>
            <Link to="/profile">
              {userObj.photoURL
                ? <img className="ProfilePicture" src={userObj.photoURL} />
                : <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />}
            </Link>
            </span>
        <input
          className="factoryInput__input"
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        
      </div>
      <div className="factoryInput__label">
        <label for="attach-file">
          <ul>
            <li><FontAwesomeIcon icon={faImage} /></li>
            <li><FontAwesomeIcon icon={faGift} /></li>
            <li><FontAwesomeIcon icon={faLocationArrow}/></li>
            <li><FontAwesomeIcon icon={faList} /></li>
            <li><FontAwesomeIcon icon={faSmile} /></li>
            <li><FontAwesomeIcon icon={faClock} /></li>
          </ul>
          
        </label>
        <input
          id="attach-file"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          style={{
            opacity:0,
            width:0,
          }}
        />
        <input type="submit" value="Tweet" className="factoryInput_arrow" />
      </div>
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
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  </div>
  )
};

export default NweetFactory;
