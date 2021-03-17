import React, { Component } from 'react';
import { authMethods } from "../../config/auth-methods";
import { auth } from "../../service/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
// import firebase from "../../config/firebase-config";

class Login extends Component {
    state = {};
    uiConfig = {
        signInFlow: "popup",
        signInOptions: authMethods,
        callbacks: {
            signInSuccessWithAuthResult: false,
        }
    }
    handleButtonClick = async (provider) => {
        const result = await auth(provider);
        console.log(result);
    }
    render() {
        return (<div>
            <div align="center" className="form-row-style mt-5 mb-5 p-5">
                <h3 className="m-5">Login/Register below!</h3>
                <div className="mb-5">
                    <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={auth} />
                </div>
            </div>
        </div>);
    }
}

export default Login;