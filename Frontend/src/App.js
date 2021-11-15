import React, { Component } from "react";
import Main from "./component/Main";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//App Component
class App extends Component {
  render() {
    return (
        <div>
          <ToastContainer autoClose={3000} />
          <Main />
        </div>
    );
  }
}
export default App;
