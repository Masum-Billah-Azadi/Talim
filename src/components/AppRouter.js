import { useEffect, useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { auth } from "../firebase";
import { AuthProvider } from "./contexts/AuthContext";
import Navigation from "./Navigation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Singup from "./pages/Singup";
const AppRouter = ()=>{
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user){
        setUserObj(user);
      }
      setInit(true);
    });
  }, []);
    return(
      <>
      {init ? (
      <Router>
        {Boolean(userObj) && <Navigation userObj={userObj}/>}
        <AuthProvider>
          <Switch>
                {Boolean(userObj) ? (
                  <>
                <Route exact path="/">
                  <Home userObj={userObj}/>
                </Route>
                <Route exact path="/Profile">
                  <Profile userObj={userObj}/>
                </Route>
              </>)
            : 
                (<Route exact path="/">
                <Singup/>
              </Route>)
            }
            <Route exact path="/Login">
              <Login/>
            </Route>
            <Route exact path="/Singup">
              <Singup/>
            </Route>
          </Switch>
        </AuthProvider>
      </Router>
      ) : (
        "Initializing..."
      )}
      
    </>
      
    );
};
export default AppRouter;