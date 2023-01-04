/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-comment-textnodes */

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
        <div>
          <NweetFactory userObj={userObj} />
          <div style={{ marginTop: 30 }}>
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