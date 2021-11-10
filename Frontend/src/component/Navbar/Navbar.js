import React, { Component } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { auth } from "../../service/auth";

class NavigationBar extends Component {
    handleLogout = () => {
        auth.signOut();
        localStorage.clear();
    };
    render() {
        if (localStorage.getItem("user")) {
            let user = JSON.parse(localStorage.getItem("user"));
            let message = "Hi, " + user.displayName.split(" ")[0];
            let photoURL = user.photoURL;
            return (
                <Navbar expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="/home">Finding Ohana</Navbar.Brand>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto"></Nav>
                        <Nav>
                            <Nav.Link href="/profile"><img className="navbar-photoURL" alt="" src={photoURL ? photoURL : "default_photoURL.jpg"}></img></Nav.Link>
                            <NavDropdown title={message}>
                                <NavDropdown.Item href={"/profile/" + user.uid} onClick={this.handleLogout}>View Profile</NavDropdown.Item>
                                <NavDropdown.Item href="/login" onClick={this.handleLogout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link  ></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            );
        }

        else
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
}
export default NavigationBar;
