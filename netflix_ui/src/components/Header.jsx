import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";

export default function Header(props) {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  // Only render the button if we are not on the login page
  if (location.pathname === "/login") {
    return (
      <StyledHeader className="flex a-center j-between">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
      </StyledHeader>
    );
  }

  return (
    <StyledHeader className="flex a-center j-between">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <button onClick={() => navigate(props.login ? "/login" : "/signup")}>
        {props.login ? "Sign In" : "Sign Up"}
      </button>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  padding: 0 4rem;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  .logo {
    img {
      height: 8rem;
    }
  }
  button {
    padding: 0.5rem 1rem;
    background-color: #e50914;
    border: none;
    cursor: pointer;
    color: white;
    border-radius: 0.2rem;
    font-weight: bolder;
    font-size: 1.05rem;
    border-radius: 4px;
    transition: all 0.1s ease-in-out;
  }
  button:active {
    transform: scale(0.95); /* Slight shrink effect */
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2); /* Adds a subtle shadow when clicked */
  }
`;
