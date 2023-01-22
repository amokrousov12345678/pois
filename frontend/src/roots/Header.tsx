import React from "react";
import {Link} from "react-router-dom";
import {Navbar, Nav} from "react-bootstrap";


function Header(props) {
    return (
        <Navbar variant="dark" bg="dark">
            <Navbar.Brand>
                Система управления проектной организацией
            </Navbar.Brand>
        </Navbar>
    );
}

export default Header;
