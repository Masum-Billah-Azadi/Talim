import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { dbService } from "../../firebase";

const Home = () => {
    const [nweet, setNweet] = useState("");
    const onSubmit = async (e) => {
    e.preventDefault();
    try {
    const docRef = await addDoc(collection(dbService, "nweets" ), {
    nweet,
    createdAt: Date.now(),
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
              placeholder="What's on your mind?"
              maxLength={120}
            />
            <input type="submit" value="Nweet" />
          </form>
        </div>
      );
    }
    export default Home;