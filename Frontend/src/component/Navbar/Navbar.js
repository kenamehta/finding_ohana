import React, { useContext } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { auth } from "../../service/auth";
import { StoreContext } from "../../context/store";

export default function NavigationBar() {
  const storeContext = useContext(StoreContext);
  const { state } = storeContext;

  // useEffect(() => {
  //   if (localStorage.getItem("user")) {
  //     console.log("You are in navbar")
  //     const user = JSON.parse(localStorage.getItem("user"));
  //     const userID = user.uid;
  //     const userName = user.displayName;
  //     const payload = { userID, userName, email: user.email, role: "Member" };
  //     axios.post(base + "/profile", payload).then((result) => {
  //       dispatch({
  //         type: "SET_INITIAL_PROFILE",
  //         value: {
  //           userID: result.data.payload._id,
  //           userName: result.data.payload.name,
  //           profilePhoto: result.data.payload.photo,
  //         },
  //       });
  //     });
  //   }
  //   // eslint-disable-next-line
  // },[]);
  const handleLogout = () => {
    auth.signOut();
    localStorage.clear();
  };
  if (localStorage.getItem("user")) {
    let user = JSON.parse(localStorage.getItem("user"));
    let message = "Hi, " + user.displayName.split(" ")[0];
    let photoURL = state.profilePhoto ?? user.photoURL;
    user.photoURL = photoURL;
    console.log(user);
    localStorage.setItem("user", JSON.stringify(user));
    let currentTalkjsUser = {
      name: user.displayName,
      email: user.email,
      photoUrl: user.photoURL,
      id: user.uid,
    };
    localStorage.setItem(
      "currentTalkjsUser",
      JSON.stringify(currentTalkjsUser)
    );
    return (
      <Navbar expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/home">Finding Ohana</Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav>
            <Nav.Link href={"/profile/" + user.uid}>
              <img
                className="navbar-photoURL"
                alt=""
                src={photoURL ? photoURL : "default_photoURL.jpg"}
              ></img>
            </Nav.Link>
            <NavDropdown title={message}>
              <NavDropdown.Item href={"/profile/" + user.uid}>
                View Profile
              </NavDropdown.Item>
              <NavDropdown.Item href="/login" onClick={handleLogout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link></Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/mynetwork">My Network</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/messaging">Messaging</Nav.Link>
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
