import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
const NavbarFirst = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            Neo<span style={{ color: "red" }}>STORE</span>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Link
              style={{
                textDecoration: "none",
                color: "white",
                display: "inline-block",
                marginRight: "40px",
              }}
              to="/"
            >
              Home
            </Link>
            <Link
              style={{
                textDecoration: "none",
                color: "white",
                display: "inline-block",
                marginRight: "40px",
              }}
              to="/product"
            >
              Products
            </Link>
            <Link
              style={{
                textDecoration: "none",
                color: "white",
                display: "inline-block",
                marginRight: "40px",
              }}
              to="/registration"
            >
              Signup
            </Link>
            <Link
              style={{
                textDecoration: "none",
                color: "white",
                display: "inline-block",
                marginRight: "40px",
              }}
              to="/login"
            >
              Login
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarFirst;
