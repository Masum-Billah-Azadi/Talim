import { collection, getDoc, query, where } from "firebase/firestore";
import React from "react";
import { dbService } from "../../firebase";
const Check = async (props) => {
  // const [talim, setTalim] = useState("");
  const docRef = query(collection(dbService, "nweets" ), where("nweets","==",true));
  const docSnap = await getDoc(docRef);
  docSnap.forEach((doc) => {
    console.log(doc.id, "->" ,doc.data());
    
  });

  return (
    <div>
      <h1>masum</h1>
    </div>
  )
};

export default Check;
