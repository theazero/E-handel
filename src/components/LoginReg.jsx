import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice'; 

function LoginReg() {
  const [formType, setFormType] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch(); 

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (!isValidEmail(email)) return setError("Please enter a valid email address.");
  if (formType === "register" && password !== confirmPassword) return setError("Passwords do not match.");

  try {
    const url =
      formType === "login"
        ? "https://js2-ecommerce-api.vercel.app/api/auth/login"
        : "https://js2-ecommerce-api.vercel.app/api/auth/register";

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    console.log("Login successful, token received:", data.token);
    dispatch(login(data.token)); 
  } catch (err) {
    console.error("Login error:", err.message);
    setError(err.message);
  }
};


  return (
    <div className="login-reg-container">
      <h1>{formType === 'login' ? 'Login' : 'Register'}</h1>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {formType === 'register' && (
          <>
            <label>Confirm Password:</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </>
        )}
        <button type="submit">{formType === 'login' ? 'Login' : 'Register'}</button>
      </form>

      <p>
        {formType === 'login' ? 'No account yet? ' : 'Already have an account? '}
        <button onClick={() => setFormType((prev) => (prev === 'login' ? 'register' : 'login'))}>
          {formType === 'login' ? 'Register here' : 'Login here'}
        </button>
      </p>
    </div>
  );
}

export default LoginReg;
