import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // Import Link
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.error("Sign-in Error:", error.message);
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/netflix");
  });

  return (
    <Container>
      <BackgroundImage />
      <Header />
      <FormContainer>
        <Form>
          <h1>Sign In</h1>
          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin}>Sign In</Button>
          {/* New Sign-up Link */}
          <SignUpText>
            New to Netflix?{" "}
            <StyledLink to="/">Sign up now</StyledLink>
          </SignUpText>
        </Form>
      </FormContainer>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.7);
  background-size: cover;
  background-position: center;
  color: white;
`;

const FormContainer = styled.div`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.85);
  padding: 3rem;
  border-radius: 8px;
  text-align: center;
  width: 350px;
  color: white;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  h1 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
`;

const Input = styled.input`
  padding: 0.8rem;
  font-size: 1rem;
  background-color: #333;
  border: none;
  border-radius: 4px;
  color: white;

  &::placeholder {
    color: #999;
  }
`;

const Button = styled.button`
  margin-top: 0.5rem;
  background-color: #e50914;
  border: none;
  cursor: pointer;
  color: white;
  padding: 0.8rem;
  font-weight: bold;
  font-size: 1rem;
  border-radius: 4px;
  transition: all 0.1s ease-in-out;

  &:active {
    transform: scale(0.95);
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  }
`;

const SignUpText = styled.p`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #999;
`;

const StyledLink = styled(Link)`
  color: #e50914;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

export default Login;
