import React, { useState } from 'react';
import styled from 'styled-components';
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { firebaseAuth } from '../utils/firebase-config';
import { signOut,onAuthStateChanged } from "firebase/auth";
import { FaPowerOff, FaSearch } from "react-icons/fa";

export default function Navbar({ isScrolled }) {
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const navigate = useNavigate();
  const links = [
    { name: "Home", link: "/netflix" },
    { name: "Movies", link: "/movies" },
    { name: "TV Shows", link: "/series" },
    { name: "My List", link: "/mylist" }
  ];

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/login");
  });

  return (
    <Container>
      <nav className={`${isScrolled ? "scrolled" : ""} flex`}>
        <div className="left flex a-center">
          <div className="brand flex a-center j-center">
            <img src={logo} alt="Logo" />
          </div>
        </div>
        <div className="right flex a-center">
          <ul className="links flex">
            {links.map(({ name, link }) => (
              <li key={name}>
                <Link to={link}>{name}</Link>
              </li>
            ))}
          </ul>
          <div className={`search ${showSearch ? "show-search" : ""}`}>
            <button
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) setShowSearch(false);
              }}
            >
              <FaSearch />
            </button>
            <input
              type="text"
              placeholder="Search"
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onBlur={() => {
                setShowSearch(false);
                setInputHover(false);
              }}
            />
          </div>
          <button onClick={() => signOut(firebaseAuth)}>
            <FaPowerOff />
          </button>
        </div>
      </nav>
    </Container>
  );
}

const Container = styled.div`
  .scrolled {
    background-color: black;
  }

  nav {
    position: sticky;
    top: 0;
    height: 6.5rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    z-index: 2;
    padding: 0 4rem;
    transition: 0.3s ease-in-out;

    .left {
      .brand {
        img {
          height: 6rem;
        }
      }
    }

    .right {
      display: flex;
      align-items: center;
      gap: 2rem;

      .links {
        display: flex;
        list-style-type: none;
        gap: 5rem;

        li a {
          color: white;
          text-decoration: none;
          font-size: 1rem;
        }
      }

      .search {
        margin-left: 3rem; 
        display: flex;
        align-items: center;
        gap: 2rem;

        button {
          background-color: transparent;
          border: none;

          svg {
            color: white;
            font-size: 1rem;
          }
        }

        input {
          width: 0;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease-in-out;
          background-color: transparent;
          border: none;
          color: white;

          &:focus {
            outline: none;
          }
        }
      }

      .show-search {
        border: 1px solid gray;
        border-radius:5px;
        background-color: rgba(0, 0, 0, 0.6);

        input {
          width: 150px;
          opacity: 1;
          visibility: visible;
          padding: 0.3rem;
        }
      }

      button {
        background-color: transparent;
        border: none;
        cursor: pointer;

        &:hover {
          svg {
          color: red; 
          }
        }
    
        &:focus {
          outline: none;
        }

        svg {
          color: white;
          font-size: 1.2rem;
        }
      }
    }
  }
`;
