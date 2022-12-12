/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

const AppRouter = ()=>{
    const [isLoggedin,setIsLoggedin]= useState(true);
    return(
        <Router>
            <Switch>
                {isLoggedin ? (<>
                    <Route exact path="/">
                        <Home />
                    </Route>
                </>) : (<Route exact path="/"><Auth/></Route>)}
            </Switch>
        </Router>
    );
};
export default AppRouter;