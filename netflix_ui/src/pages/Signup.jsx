import React, { useState } from 'react';
import styled from "styled-components";
import BackgroundImage from '../components/BackgroundImage';
import Header from '../components/Header';
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"


export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [formValues, setFormValues] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleSignin = async () => {
        try{
            const {email, password}=formValues;
            await createUserWithEmailAndPassword(firebaseAuth, email, password);
        }catch(err){
            console.log(err);
        }
    };

    onAuthStateChanged(firebaseAuth, (currentUser)=>{
        if (currentUser) navigate("/netflix");
    });

    return (
        <Container $showPassword={showPassword}>
            <BackgroundImage />
            <div className='content'>
                <Header login />
                <div className="body">
                    <div className="text">
                        <h1>Unlimited movies, TV shows and more</h1>
                        <h4>Watch Anywhere. Cancel Anytime.</h4>
                        <h6>
                            Ready to Watch?{" "}Enter your email to create or restart your membership.
                        </h6>

                        <div className='form'>
                            <input
                                type='email'
                                placeholder='Email Address'
                                name='email'
                                value={formValues.email}
                                onChange={(e) => setFormValues({
                                    ...formValues,
                                    [e.target.name]: e.target.value
                                })}
                            />

                            {showPassword && (
                                <input
                                    type='password'
                                    placeholder='Password'
                                    name='password'
                                    value={formValues.password}
                                    onChange={(e) => setFormValues({
                                        ...formValues,
                                        [e.target.name]: e.target.value
                                    })}
                                />
                            )}

                            {!showPassword && (
                                <button onClick={() => setShowPassword(true)}>Get Started</button>
                            )}
                        </div>
                        <button className="signin-btn" onClick={handleSignin}>Sign Up</button>
                    </div>
                </div>
            </div>
        </Container>
    );
}

const Container = styled.div`
  position: relative;

  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 10%;

    .body {
      text-align: center;
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;

      .text {
        max-width: 600px;
        text-align: center;

        h1 {
          font-size: 3.5rem;
          font-weight: bold;
        }

        h4 {
          font-size: 1.5rem;
          margin-top: 0.5rem;
        }

        h6 {
          font-size: 1rem;
          margin-top: 0.5rem;
        }

        .form {
          display: grid;
          gap: 0.8rem;
          margin-top: 1rem;
          width: 100%;
          grid-template-columns: ${({ $showPassword }) => $showPassword ? "1fr 1fr" : "2fr 1fr"};

          input {
            padding: 0.8rem;
            font-size: 1rem;
            background-color: rgba(0, 0, 0, 0.7);
            border-color: white;
            border-radius: 5px;
            border-width:0.5px;
            color:white;
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
          .button:active {
            transform: scale(0.95); 
            box-shadow: 0 0 8px rgba(0, 0, 0, 0.2); 
          }
        }

        .signin-btn {
            margin-top: 1rem;
            background-color: #e50914;
            border: none;
            cursor: pointer;
            color: white;
            padding: 0.5rem 1rem;
            font-weight: bolder;
            font-size: 1.05rem;
            border-radius: 4px;
            transition: all 0.1s ease-in-out;
    }
    .signin-btn:active {
        transform: scale(0.95); /* Slight shrink effect */
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.2); /* Adds a subtle shadow when clicked */
        }
      }
    }
  }
`;
