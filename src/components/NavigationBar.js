import {Navbar , Nav, Container} from 'react-bootstrap'
import React from "react";



export const NavBar =(props)=> {
    return (
        <Navbar bg="lightskyblue" variant="light">
            <Container>
                <Navbar.Brand >Welcome</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/favorite">Favorites</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

