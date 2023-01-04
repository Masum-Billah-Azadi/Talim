/* eslint-disable no-undef */
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
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => updateProfile(user, { displayName: user.displayName }),
          });
      }else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
//React Relode Page Update User Name this -- refreshUser = () => {
  const refreshUser = () => {
    const user = auth.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => updateProfile(user, { displayName: user.displayName }),
      //react and Firebase Auto detect Change and User_Name currently
      });
  };
    return(
      <>
      {init ? (
      <Router>
        {Boolean(userObj) && <Navigation userObj={userObj}/>}
        <AuthProvider>
          <Switch>
            <div
              style={{
                maxWidth: 890,
                width: "100%",
                margin: "0 auto",
                marginTop: 80,
                display: "flex",
                justifyContent: "center",
              }}
            >
                {Boolean(userObj) ? (
                  <>
                <Route exact path="/">
                  <Home userObj={userObj}/>
                </Route>
                <Route exact path="/Profile">
                  <Profile userObj={userObj} refreshUser={refreshUser}/>
                  {/* react and Firebase Auto detect Change and User_Name currently */}
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
            </div>
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