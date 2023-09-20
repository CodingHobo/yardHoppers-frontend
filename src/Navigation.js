import React, { useContext, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import userContext from "./userContext";
import "./Navigation.css";

function Navigation({ logout }) {
  const { currUser } = useContext(userContext);
  const [expanded, setExpanded] = useState(false);

  const handleLinkClick = () => {
    if (expanded) {
      setExpanded(false);
    }
  };

  return (
    <Navbar
      collapseOnSelect
      expand="md"
      className="navbar"
      expanded={expanded}
    >
      <Navbar.Brand>
        <NavLink to="/" className="nav-link">
          <h2>Yard Hoppers</h2>
        </NavLink>
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="responsive-navbar-nav"
        onClick={() => setExpanded(!expanded)}
      />
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
        <Nav>
          <Nav.Link
            as={NavLink}
            to="/listings"
            onClick={handleLinkClick}
          >
            Listings
          </Nav.Link>
          {!currUser && (
            <>
              <Nav.Link
                as={NavLink}
                to="/login"
                onClick={handleLinkClick}
              >
                Login
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/signup"
                onClick={handleLinkClick}
              >
                Sign Up
              </Nav.Link>
            </>
          )}
          {currUser && (
            <>
              <Nav.Link
                as={NavLink}
                to="/new-listing"
                onClick={handleLinkClick}
              >
                Create a Listing
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/profile"
                onClick={handleLinkClick}
              >
                Profile
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/profile"
                onClick={() => {
                  handleLinkClick();
                  logout();
                }}
                className="logout"
              >
                Log out {currUser.username}
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
