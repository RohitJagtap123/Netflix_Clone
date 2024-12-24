import React, {useState} from 'react';
import styled from "styled-components";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/home.jpg";
import title from "../assets/homeTitle.png";
import { FaPlay } from 'react-icons/fa';
import { AiOutlineInfoCircle } from "react-icons/ai";

export default function Netflix() {
  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <div>
      <Navbar isScrolled={isScrolled} />
      <div className='hero'>
        <img src={backgroundImage} alt="backgroundImage" className='bacckground-image'/>
        <div className='container'>
          
        </div>
      </div>
    </div>
  );
}

const Container = styled.div``;