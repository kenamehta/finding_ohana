import React, { Component } from "react";
import { Route } from "react-router-dom";
import LandingPage from "./LandingPage/LandingPage";

//Create a Main Component
class Main extends Component {
  render() {
    return (
        <div>
          <Route path="/" component={LandingPage} />
          
        </div>
    );
  }
}
//Export The Main Component
export default Main;
