/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-comment-textnodes */

import { faHandSparkles, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
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
          <div className='Search_p'>
            <div className='Searchbar'>
              <FontAwesomeIcon icon={faSearch} color={"#1c9aef"} size="1x" />
              <input
                type="text"
                placeholder='Search Twitter'
              />
            </div>
          </div>
          
          <div className='TrandTropic'>
            <h1>Trends for you</h1>
              <div className='TTropic'>
                <p>Politic<span>Trending</span></p>
                <h3>Taliban</h3>
                <p>29k Tweets</p>
              </div>
              <div className='TTropic'>
                <p>Bangladesh<span>Trending</span></p>
                <h3>ChatGpt</h3>
                <p>89k Tweets</p>
              </div>
          </div>
          <div className='WTFollow'>
            <div>
              <h1>Who to follow</h1>
              <div className='FollowParson'>
              {userObj.photoURL
                ? <img className="ProfilePicture" src={userObj.photoURL} />
                : <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />}
                <div className='Parson_name'>
                  <h4>{userObj.displayName}</h4>
                  <p>@{userObj.displayName}</p>
                </div>
                <button>Follow</button>
              </div>

              <div className='FollowParson'>
              {userObj.photoURL
                ? <img className="ProfilePicture" src={userObj.photoURL} />
                : <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />}
                <div className='Parson_name'>
                  <h4>{userObj.displayName}</h4>
                  <p>@{userObj.displayName}</p>
                </div>
                <button>Follow</button>
              </div>

              <div className='FollowParson'>
              {userObj.photoURL
                ? <img className="ProfilePicture" src={userObj.photoURL} />
                : <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />}
                <div className='Parson_name'>
                  <h4>{userObj.displayName}</h4>
                  <p>@{userObj.displayName}</p>
                </div>
                <button>Follow</button>
              </div>
            </div>
          </div>
          
          
        </div>
      </div>
      );
    }
    export default Home;