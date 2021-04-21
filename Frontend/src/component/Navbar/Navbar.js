import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
// import NavDropdown from "react-bootstrap/NavDropdown";
import { auth } from "../../service/auth";

class NavigationBar extends Component {
    handleLogout = () => {
        auth.signOut();
        localStorage.clear();
    };
    render() {
        // let message = "Hi, " + localStorage.getItem("nickname");
        return (
            <Navbar expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/home">Finding Ohana</Navbar.Brand>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto"></Nav>
                <Nav>

                    <Nav.Link href="/login" onClick={this.handleLogout}>Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        );
    }
}
export default NavigationBar;
