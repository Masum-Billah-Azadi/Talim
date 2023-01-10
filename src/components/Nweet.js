/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import { deleteObject, ref } from "@firebase/storage";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { dbService, storageService } from "../firebase";

//icon input

const Nweet = ({ nweetObj, isOwner,userId,createdAt,userImage, }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if (ok) {
      // delete nweet
      await deleteDoc(doc(dbService, `nweets/${nweetObj.id}`));
      //Delete Stroge File(Nweet image)
      await deleteObject(ref(storageService, nweetObj.attachmentUrl));
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(doc(dbService, `nweets/${nweetObj.id}`), {
      text: newNweet,
    });
    setEditing(false);
  };
  const onChange = ({ target: { value } }) => {
    setNewNweet(value);
  };
  function formatDate(milliseconds) {
    const date = new Date(milliseconds);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
  }
  return (
    <div className="nweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              type="text"
              placeholder="Edit your Nweet"
              value={newNweet}
              required
              onChange={onChange}
              autoFocus
              className="formInput"
            />
            <input type="submit" value="Update Nweet" className="formBtn"/>
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {userImage &&<img className="User_Avater" src={userImage}/>}
          <span>{userId}</span>
          <span>{formatDate(createdAt)}</span>
          {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
          {isOwner && (
          <div class="nweet__actions">
            <span onClick={onDeleteClick}>
            <FontAwesomeIcon icon={faTrash} />
            </span>
            <span onClick={toggleEditing}>
            <FontAwesomeIcon icon={faPencilAlt} />
            </span>
          </div>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
