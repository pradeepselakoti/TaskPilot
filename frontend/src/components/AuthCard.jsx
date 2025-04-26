

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { FiEye, FiEyeOff } from "react-icons/fi";
// import "./AuthCard.css";

// export default function AuthCard() {
//   const [isFlipped, setIsFlipped] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showSignupPassword, setShowSignupPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const handleFlip = () => setIsFlipped(!isFlipped);

//   return (
//     <div className="auth-container">
//       <motion.div className={`auth-card ${isFlipped ? "flipped" : ""}`}>
        
//         {/* Login Form */}
//         <div className="auth-face auth-front">
//           <h2 className="text-2xl font-bold text-indigo-700 mb-2">Welcome back</h2>
//           <p className="text-gray-500 text-sm mb-6">Please enter your details to sign in</p>

//           <label>Email address</label>
//           <input type="email" placeholder="Enter your email" />

//           <label>Password</label>
//           <div className="password-input">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Enter your password"
//             />
//             <span onClick={() => setShowPassword(!showPassword)}>
//               {showPassword ? <FiEyeOff /> : <FiEye />}
//             </span>
//           </div>

//           <div className="auth-options">
//   <label className="remember-me">
//     <input type="checkbox" id="remember" />
//     <span>Remember me</span>
//   </label>

//   <a href="#" className="forgot-link">Forgot password?</a>
// </div>




//           <button>Sign in</button>
//           <p className="toggle-link">
//             Don’t have an account? <span onClick={handleFlip}>Sign up</span>
//           </p>
//         </div>

//         {/* Signup Form */}
//         <div className="auth-face auth-back">
//           <h2 className="text-2xl font-bold text-indigo-700 mb-2">Create your account</h2>
//           <p className="text-gray-500 text-sm mb-6">Fill in your details to get started</p>

//           <div className="name-row">
//             <div className="name-input">
//               <label>First Name</label>
//               <input type="text" placeholder="John" />
//             </div>
//             <div className="name-input">
//               <label>Last Name</label>
//               <input type="text" placeholder="Doe" />
//             </div>
//           </div>

//           <label>Email Address</label>
//           <input type="email" placeholder="you@example.com" />

//           <label>Password</label>
//           <div className="password-input">
//             <input
//               type={showSignupPassword ? "text" : "password"}
//               placeholder="Create a password"
//             />
//             <span onClick={() => setShowSignupPassword(!showSignupPassword)}>
//               {showSignupPassword ? <FiEyeOff /> : <FiEye />}
//             </span>
//           </div>

//           <label>Confirm Password</label>
//           <div className="password-input">
//             <input
//               type={showConfirmPassword ? "text" : "password"}
//               placeholder="Confirm your password"
//             />
//             <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
//               {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
//             </span>
//           </div>

//           <button>Create Account</button>
//           <p className="toggle-link">
//             Already have an account? <span onClick={handleFlip}>Sign in</span>
//           </p>
//         </div>

//       </motion.div>
//     </div>
//   );
// }
// AuthCard.jsx
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


