import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUserPlus, FaEye, FaEyeSlash } from "react-icons/fa";
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
const RegisterContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #0d2c78, #9b40c2);
  padding: 1rem;
`;

const RegisterForm = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 16px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  animation: ${fadeIn} 0.5s ease-out;
`;

const IconContainer = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const UserIcon = styled(FaUserPlus)`
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
  padding-right: ${(props) => (props.type === "password" ? "2.5rem" : "0.9rem")};
  border-radius: 8px;
  border: 1px solid ${(props) => (props.error ? "#e74c3c" : "#ddd")};
  outline: none;
  font-size: 1rem;
  transition: all 0.3s ease;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border-color: ${(props) => (props.error ? "#e74c3c" : "#3498db")};
    box-shadow: 0 0 0 2px
      ${(props) =>
        props.error ? "rgba(231, 76, 60, 0.2)" : "rgba(52, 152, 219, 0.2)"};
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
  background-color: ${(props) =>
    props.success ? "rgba(46, 204, 113, 0.1)" : "rgba(231, 76, 60, 0.1)"};
  color: ${(props) => (props.success ? "#27ae60" : "#e74c3c")};
  border: 1px solid ${(props) => (props.success ? "#2ecc71" : "#e74c3c")};
`;

const LoginLink = styled.p`
  text-align: center;
  margin-top: 1.8rem;
  font-size: 0.95rem;
  color: #7f8c8d;
`;

const LoginLinkText = styled(Link)`
  color: #3498db;
  font-weight: 600;
  text-decoration: none;
  margin-left: 0.3rem;

  &:hover {
    text-decoration: underline;
  }
`;

// Password strength indicator
const PasswordStrength = styled.div`
  margin-top: 0.5rem;
`;

const StrengthBar = styled.div`
  height: 5px;
  border-radius: 3px;
  margin-top: 0.3rem;
  background: ${(props) => {
    if (props.strength === "weak") return "#e74c3c";
    if (props.strength === "medium") return "#f39c12";
    if (props.strength === "strong") return "#2ecc71";
    return "#ddd";
  }};
  width: ${(props) => {
    if (props.strength === "weak") return "33%";
    if (props.strength === "medium") return "66%";
    if (props.strength === "strong") return "100%";
    return "0%";
  }};
  transition: all 0.3s ease;
`;

const StrengthText = styled.span`
  font-size: 0.8rem;
  color: ${(props) => {
    if (props.strength === "weak") return "#e74c3c";
    if (props.strength === "medium") return "#f39c12";
    if (props.strength === "strong") return "#2ecc71";
    return "#7f8c8d";
  }};
`;

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const navigate = useNavigate();
  const API_URL = "http://127.0.0.1:8000/api/account/";

  // Password strength check
  const checkPasswordStrength = (password) => {
    if (password.length === 0) return "";

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;

    const strengthFactors = [
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
      isLongEnough,
    ];
    const strengthScore = strengthFactors.filter(Boolean).length;

    if (strengthScore <= 2) return "weak";
    if (strengthScore <= 4) return "medium";
    return "strong";
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (passwordStrength === "weak") {
      newErrors.password = "Password is too weak";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }

    if (message) {
      setMessage("");
    }

    if (name === "password") {
      setPasswordStrength(checkPasswordStrength(value));
    }

    if (
      name === "confirmPassword" &&
      formData.password === value &&
      errors.confirmPassword
    ) {
      setErrors({ ...errors, confirmPassword: "" });
    }
    if (
      name === "password" &&
      formData.confirmPassword === value &&
      errors.confirmPassword
    ) {
      setErrors({ ...errors, confirmPassword: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirm_password: formData.confirmPassword, // ✅ send confirm_password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.username) {
          throw new Error(`Username: ${data.username[0]}`);
        } else if (data.email) {
          throw new Error(`Email: ${data.email[0]}`);
        } else if (data.password) {
          throw new Error(`Password: ${data.password[0]}`);
        } else {
          throw new Error(
            data.detail || data.error || "Registration failed. Please try again."
          );
        }
      }

      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setMessage(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RegisterContainer>
      <RegisterForm>
        <IconContainer>
          <UserIcon />
        </IconContainer>
        <Title>Create Account</Title>

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
            {errors.username && <ErrorMessage>• {errors.username}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <InputLabel htmlFor="email">Email</InputLabel>
            <InputField
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            {errors.email && <ErrorMessage>• {errors.email}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <InputLabel htmlFor="password">Password</InputLabel>
            <InputContainer>
              <InputField
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />
              <TogglePassword onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </TogglePassword>
            </InputContainer>
            {formData.password && (
              <PasswordStrength>
                <StrengthText strength={passwordStrength}>
                  Strength: {passwordStrength || "None"}
                </StrengthText>
                <StrengthBar strength={passwordStrength} />
              </PasswordStrength>
            )}
            {errors.password && <ErrorMessage>• {errors.password}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
            <InputContainer>
              <InputField
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
              />
              <TogglePassword
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </TogglePassword>
            </InputContainer>
            {errors.confirmPassword && (
              <ErrorMessage>• {errors.confirmPassword}</ErrorMessage>
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
            <span>{isLoading ? "Creating Account..." : "Register"}</span>
          </SubmitButton>
        </Form>

        {message && (
          <ResponseMessage success={message.includes("successful")}>
            {message}
          </ResponseMessage>
        )}

        <LoginLink>
          Already have an account?
          <LoginLinkText to="/login">Sign in</LoginLinkText>
        </LoginLink>
      </RegisterForm>
    </RegisterContainer>
  );
};

export default Register;
