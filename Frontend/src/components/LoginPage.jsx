import React, { useState, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import '../styles/Login.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isFormValid, setIsFormValid] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!regex.test(email)) return 'Invalid email format';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  useEffect(() => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    setErrors({ email: emailError, password: passwordError });
    setIsFormValid(!emailError && !passwordError);
  }, [email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      console.log('Login successful!');
    }
  };

  const getInputClass = (field) => {
    if (!touched[field]) return 'form-input';
    return errors[field] ? 'form-input invalid' : 'form-input valid';
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="login-title">Welcome Back!</h1>
        <p className="login-subtitle">We missed you! Please enter your details.</p>

        <div className="input-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
            className={getInputClass('email')}
          />
          {touched.email && errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="input-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
            className={getInputClass('password')}
          />
          {touched.password && errors.password && <span className="error-text">{errors.password}</span>}
        </div>

        <div className="remember-section">
          <label className="remember-label">
            <input type="checkbox" />
            Remember me
          </label>
          <a href="#" className="forgot-password">Forgot password?</a>
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className="submit-button"
        >
          Sign in
        </button>

        <div className="separator">or</div>

        <button type="button" className="google-button">
          <FcGoogle size={20} />
          Sign in with Google
        </button>

      </form>
    </div>
  );
};

export default LoginPage;