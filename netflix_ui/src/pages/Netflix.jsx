import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/home.jpg";
import title from "../assets/homeTitle.png";
import { FaPlay } from 'react-icons/fa';
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, getGenres } from '../store';
import Slider from '../components/Slider';

export default function Netflix() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const movies = useSelector((state)=>state.netflix.movies);
  const genresLoaded = useSelector((state)=> state.netflix.genresLoaded);

  useEffect(()=>{
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(()=>{
    if (genresLoaded) dispatch(fetchMovies({type:"all"}));
  },[genresLoaded, dispatch]);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className='hero'>
        <img src={backgroundImage} alt="backgroundImage" className='background-image'/>
        <div className='container'>
          <div className="logo">
            <img src={title} alt="movietitle" />
          </div>
          <div className="buttons flex">
            <button className='flex j-center a-center' onClick={()=>navigate('/player')}>
              <FaPlay/> Play
            </button>
            <button className='flex j-center a-center'> 
              <AiOutlineInfoCircle /> More Info
            </button>
          </div>
        </div>
      </div>
      <Slider movies={movies}/>
    </Container>
  );
}

const Container = styled.div`
  background-color: black;

  .hero {
    position: relative;

    .background-image {
      filter: brightness(60%);
    }

    img {
      height: 100vh;
      width: 100vw;
    }

    .container {
      position: absolute;
      bottom: 0rem;

      .logo {
        img {
          width: 60%;
          height: auto;
          margin-left: 6rem;
        }
      }

      .buttons {
        margin: 3rem;
        gap: 1.5rem;
        margin-left: 6rem;

        button {
          font-size: 1rem;
          gap: 0.5rem;
          border-radius: 0.2rem;
          padding: 0.4rem 1.2rem;
          border: none;
          cursor: pointer;
          transition: 0.2s ease-in-out;

          &:hover {
            opacity: 0.8;
          }

          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;

            svg {
              font-size: 1.2rem;
            }
          }
        }
      }
    }
  }
`;
