import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "./context/store.js";

ReactDOM.render(
  <StoreProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreProvider>,
  document.querySelector("#root")
);
