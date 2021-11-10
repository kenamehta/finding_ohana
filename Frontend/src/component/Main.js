import React, { Component } from "react";
import { Route } from "react-router-dom";
import LandingPage from "./LandingPage/LandingPage";
import ProfilePage from "./ProfilePage/ProfilePage";
import Navbar from "./Navbar/Navbar";
import Login from "./Register/Login";

//Create a Main Component
class Main extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={Navbar} />
        <Route path="/login" component={Login} />
        <Route path="/home" component={LandingPage} />
        <Route path="/profile/:userID" component={ProfilePage} />
      </div>
    );
  }
}
//Export The Main Component
export default Main;
