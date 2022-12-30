/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-comment-textnodes */
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { dbService, storageService } from "../../firebase";
import Nweet from "../Nweet";

const Home = ({ userObj }) => {
const [nweet, setNweet] = useState("");
const [nweets, setNweets] = useState([]);
const [attachment, setAttachment] = useState();

useEffect(() => {
const q = query(
collection(dbService, "nweets"),
orderBy("createdAt", "desc")
);
onSnapshot(q, (snapshot) => {
const nweetArr = snapshot.docs.map((document) =>({
id: document.id,
...document.data(),
}));
setNweets(nweetArr);
});
}, []);

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
        <div>
          <form onSubmit={onSubmit}>
            <input
              value={nweet}
              onChange={onChange}
              type="text"
              placeholder=" What's on your mind"
              maxLength={120}
              />
            <input type="file" accept="image/*" onChange={onFileChange} />
            <input type="submit" value="Nweet" />
            {attachment && (
          <div>
            <img src = {attachment} width="50px" height="50px"/>
              <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
          </form>
          <div>
            {nweets.map((nweet) => (
              <Nweet
                key={nweet.id}
                nweetObj={nweet}
                isOwner={nweet.creatorId === userObj.uid}
              />
            ))}
          </div>
        </div>
      );
    }
    export default Home;