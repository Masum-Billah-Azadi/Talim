/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-comment-textnodes */

import { faHandSparkles } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { dbService } from "../../firebase";
import Nweet from "../Nweet";
import NweetFactory from "../NweetFactory";

const Home = ({ userObj }) => {
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


return (
      <div className='Home_Page'>
        <div className="Main_Talim">
          <div className="Main_head"><h1>Home</h1> <span><FontAwesomeIcon icon={faHandSparkles} color={"#ffff"} size="2x" /></span></div>
          <NweetFactory userObj={userObj} />
          <>
            {nweets.map((nweet) => (
              <Nweet
                key={nweet.id}
                id={nweet.id}
                userId={nweet.userId}
                nweetObj={nweet}
                userImage={nweet.userImage}
                createdAt={nweet.createdAt}
                isOwner={nweet.creatorId === userObj.uid}
              />
            ))}
          </>
        </div>
        <div className='Right_Side'>
          <h1>Masum</h1>
        </div>
      </div>
      );
    }
    export default Home;