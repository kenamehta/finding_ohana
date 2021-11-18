import React, { useContext, useEffect } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { auth } from "../../service/auth";
import axios from "axios";
import { base } from "../../config/address";
import { StoreContext } from "../../context/store";

export default function NavigationBar() {
  const storeContext = useContext(StoreContext);
  const { state, dispatch } = storeContext;
  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      const userID = user.uid;
      const userName = user.displayName;
      const payload = { userID, userName };
      axios.post(base + "/profile", payload).then((result) => {
        dispatch({
          type: "SET_INITIAL_PROFILE",
          value: {
            userID: result.data.payload._id,
            userName: result.data.payload.name,
            profilePhoto: result.data.payload.photo,
          },
        });
      });
    }
    // eslint-disable-next-line
  }, []);
  const handleLogout = () => {
    auth.signOut();
    localStorage.clear();
  };
  if (localStorage.getItem("user")) {
    let user = JSON.parse(localStorage.getItem("user"));
    let message = "Hi, " + user.displayName.split(" ")[0];
    let photoURL = state.profilePhoto ?? user.photoURL;
    return (
      <Navbar expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/home">Finding Ohana</Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav>
            <Nav.Link href="/mynetwork">My Network</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/messaging">Messaging</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href={"/profile/" + state.userID}>
              <img
                className="navbar-photoURL"
                alt=""
                src={photoURL ? photoURL : "default_photoURL.jpg"}
              ></img>
            </Nav.Link>
            <NavDropdown title={message}>
              <NavDropdown.Item href={"/profile/" + state.userID}>
                View Profile
              </NavDropdown.Item>
              <NavDropdown.Item href="/login" onClick={handleLogout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  } else
    return (
      <Navbar expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/home">Finding Ohana</Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav>
            <Nav.Link href="/login">Sign-Up/Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
}
