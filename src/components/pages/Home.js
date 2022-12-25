import {
  addDoc,
  collection, onSnapshot,
  orderBy, query
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { dbService } from "../../firebase";
import Nweet from "../Nweet";

const Home = ({ userObj }) => {
const [nweet, setNweet] = useState("");
const [nweets, setNweets] = useState([]);

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
  const docRef = await addDoc(collection(dbService, "nweets" ), {
  text:nweet,
  createdAt: Date.now(),
  creatorId: userObj.uid,
  });
  console.log(" Document written with ID: ", docRef.id);
  } catch (error) {
  console.error(" Error adding document: ", error);
  }
  
  setNweet("");
  };
  const onChange = ({ target: { value } })=>{
  setNweet(value);
  };
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
            <input type="submit" value="Nweet" />
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