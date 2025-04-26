/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import './AuthCard.css';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const AuthCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const flipCard = () => setIsFlipped(prev => !prev);

  return (
    <div className="auth-container">
      <motion.div className={`auth-card ${isFlipped ? 'flipped' : ''}`}>
      <div className="card-face front">


        {/* FRONT - LOGIN */}
        <div className="card-face front">
          <div className="image-panel" />
          <div className="form-panel">
            <h2>Hello, <span>Welcome Back!</span></h2>
            <div className="tab">
              <span className="active">Login</span>
              <span onClick={flipCard}>SignUp</span>
            </div>
            <input type="email" placeholder="Enter your email" />
            <div className="password-input">
              <input type={showPassword ? 'text' : 'password'} placeholder="Enter Password" />
              <span onClick={() => setShowPassword(prev => !prev)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="options-row">
              <label><input type="checkbox" /> Remember me</label>
              <span className="forgot">Forgot Password?</span>
            </div>
            <button className="submit-btn">Login</button>
          </div>
        </div>
      </div>

        {/* BACK - SIGNUP */}
        <div className="card-face back">
          <div className="image-panel" />
          <div className="form-panel">
            <h2>Hello, <span>Create your Account!</span></h2>
            <div className="tab">
              <span onClick={flipCard}>Login</span>
              <span className="active">SignUp</span>
            </div>
            <div className="name-row">
              <input type="text" placeholder="First Name" />
              <input type="text" placeholder="Last Name" />
            </div>
            <input type="email" placeholder="Enter your email" />
            <input type="password" placeholder="Create Password" />
            <div className="password-input">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
              />
              <span onClick={() => setShowConfirmPassword(prev => !prev)}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button className="submit-btn">Sign Up</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthCard;


