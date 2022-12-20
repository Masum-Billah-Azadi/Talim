import { useEffect, useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { auth } from "../firebase";
import { AuthProvider } from "./contexts/AuthContext";
import Singup from "./pages/Singup";
import Home from "./sComponent/Home";

const AppRouter = ()=>{
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false);
      }
    });
  }, []);
  console.log(auth.currentUser);
    return(
        <Router>
      <AuthProvider>
          <Switch>
            {isLoggedIn ? (<Route exact path="/">
              <Home/>
            </Route>)
         : 
            (<Route exact path="/">
            <Singup/>
          </Route>)
        }
      </Switch>
      </AuthProvider>
    </Router>
    );
};
export default AppRouter;