import React, { Component } from "react";
import { authMethods } from "../../config/auth-methods";
import { auth } from "../../service/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Redirect } from "react-router";
import Verify from "./Verify";

class Login extends Component {
  state = {
    user: null,
  };
  uiConfig = {
    signInFlow: "popup",
    signInOptions: authMethods,
    callbacks: {
      signInSuccessWithAuthResult: false,
      signInSuccessUrl: false,
    },
  };
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      this.setState({ user });
    });
  }

  render() {
    let user = this.state.user;
    console.log(user);
    if (user && user.emailVerified) {
      localStorage.setItem("user", JSON.stringify(this.state.user));
      console.log(JSON.parse(localStorage.getItem("user")));
      return <Redirect to="/home" />;
    } else if (user && !user.emailVerified) {
      return <Verify />;
    }
    return (
      <div>
        <div align="center" className="form-row-style mt-5 mb-5 p-5">
          <h3 className="m-5">Login/Register below!</h3>
          <div className="mb-5">
            <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={auth} />
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
