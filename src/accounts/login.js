import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUserCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import styled, { keyframes } from "styled-components";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Styled Components
const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #0d2c78, #9b40c2);
  padding: 1rem;
`;

const LoginForm = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 16px;
  width: 100%;
  max-width: 440px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  animation: ${fadeIn} 0.5s ease-out;
`;

const IconContainer = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const UserIcon = styled(FaUserCircle)`
  font-size: 3.5rem;
  color: #3498db;
  animation: ${pulse} 2s infinite;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 1.8rem;
  font-weight: 700;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputLabel = styled.label`
  font-size: 0.95rem;
  font-weight: 600;
  color: #34495e;
  margin-bottom: 0.4rem;
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const InputField = styled.input`
  padding: 0.9rem;
  padding-right: 2.5rem;
  border-radius: 8px;
  border: 1px solid ${props => props.error ? "#e74c3c" : "#ddd"};
  outline: none;
  font-size: 1rem;
  transition: all 0.3s ease;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border-color: ${props => props.error ? "#e74c3c" : "#3498db"};
    box-shadow: 0 0 0 2px ${props => props.error ? "rgba(231, 76, 60, 0.2)" : "rgba(52, 152, 219, 0.2)"};
  }
`;

const TogglePassword = styled.span`
  position: absolute;
  right: 12px;
  color: #7f8c8d;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 0.4rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const SubmitButton = styled.button`
  background-color: #3498db;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 0.5rem;

  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const LoadingSpinner = styled.svg`
  width: 20px;
  height: 20px;
  margin-right: 0.5rem;
  animation: ${spin} 1s linear infinite;
`;

const ResponseMessage = styled.p`
  text-align: center;
  margin-top: 1.2rem;
  padding: 0.8rem;
  border-radius: 6px;
  font-size: 0.95rem;
  background-color: ${(props) => (props.success ? "rgba(46, 204, 113, 0.1)" : "rgba(231, 76, 60, 0.1)")};
  color: ${(props) => (props.success ? "#27ae60" : "#e74c3c")};
  border: 1px solid ${(props) => (props.success ? "#2ecc71" : "#e74c3c")};
`;

const SignupLink = styled.p`
  text-align: center;
  margin-top: 1.8rem;
  font-size: 0.95rem;
  color: #7f8c8d;
`;

const SignupLinkText = styled(Link)`
  color: #3498db;
  font-weight: 600;
  text-decoration: none;
  margin-left: 0.3rem;

  &:hover {
    text-decoration: underline;
  }
`;

// Main component
const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const API_URL = "http://127.0.0.1:8000/api/account/";

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error for this field when user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
    // Clear general message when user interacts with form
    if (message) {
      setMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || data.error || "Login failed. Please check your credentials.");
      }

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      setMessage("Login successful! Redirecting...");
      
      // Wait a moment before redirecting to show success message
      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } catch (err) {
      setMessage(err.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <LoginContainer>
      <LoginForm>
        <IconContainer>
          <UserIcon />
        </IconContainer>
        <Title>Welcome Back</Title>

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <InputLabel htmlFor="username">Username</InputLabel>
            <InputField
              id="username"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              error={errors.username}
            />
            {errors.username && (
              <ErrorMessage>
                <span>•</span>
                {errors.username}
              </ErrorMessage>
            )}
          </InputGroup>

          <InputGroup>
            <InputLabel htmlFor="password">Password</InputLabel>
            <InputContainer>
              <InputField
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />
              <TogglePassword onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </TogglePassword>
            </InputContainer>
            {errors.password && (
              <ErrorMessage>
                <span>•</span>
                {errors.password}
              </ErrorMessage>
            )}
          </InputGroup>

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading && (
              <LoadingSpinner
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </LoadingSpinner>
            )}
            <span>{isLoading ? "Logging in..." : "Login"}</span>
          </SubmitButton>
        </Form>

        {message && (
          <ResponseMessage success={message.includes("successful")}>
            {message}
          </ResponseMessage>
        )}

        <SignupLink>
          Don't have an account?
          <SignupLinkText to="/register">Sign up</SignupLinkText>
        </SignupLink>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;