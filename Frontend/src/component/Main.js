import React, { Component } from "react";
import { Route } from "react-router-dom";
import LandingPage from "./LandingPage/LandingPage";
import ProfilePage from "./ProfilePage/ProfilePage";
import Navbar from "./Navbar/Navbar";
import Login from "./Register/Login";
import MyNetwork from './Messaging/MyNetwork';
import Messaging from './Messaging/Messaging';
import "./style.css";

//Create a Main Component
class Main extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={Navbar} />
        <Route path="/login" component={Login} />
        <Route path="/home" component={LandingPage} />
        <Route path="/profile/:userID" component={ProfilePage} />
        <Route path="/mynetwork" component={MyNetwork}/>
        <Route path="/messaging" component={Messaging}/>
      </div>
    );
  }
}
//Export The Main Component
export default Main;
