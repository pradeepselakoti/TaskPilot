import axios from 'axios';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {useNavigate} from 'react-router-dom'

const AuthCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup form state
  const [signupFirstName, setSignupFirstName] = useState('');
  const [signupLastName, setSignupLastName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');

  const flipCard = () => setIsFlipped(prev => !prev);

  const navigate = useNavigate();

  const LoginHandler = async () => {
    try {
      const res = await axios.post(import.meta.env.VITE_BACKEND_URL +'/api/v1/auth/login', {
        email: loginEmail,
        password: loginPassword,
      },{withCredentials: true});
      
      navigate("/")

      console.log('Login success:', res.data);
    } catch (err) {
      // handle error
      console.error('Login error:', err.response?.data || err.message);
    }
  };

  const SignupHandler = async () => {
    if (signupPassword !== signupConfirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    try {
      const res = await axios.post(import.meta.env.VITE_BACKEND_URL+'/api/v1/auth/register', {
        first_name: signupFirstName,
        last_name: signupLastName,
        email: signupEmail,
        password: signupPassword,
      },{withCredentials: true});
      
      navigate("/")

      console.log('Signup success:', res.data);
      setIsFlipped(false);
    } catch (err) {
      // handle error
      console.error('Signup error:', err.response?.data || err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="relative w-full max-w-5xl h-[520px]">
        <motion.div
          className="w-full h-full relative shadow-2xl"
          style={{
            perspective: 1500,
          }}
        >
          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full relative"
            style={{
              transformStyle: "preserve-3d",
            }}
          >

            {/* FRONT: Login */}
            <div
              className="absolute w-full h-full flex flex-row rounded-2xl"
              style={{
                backfaceVisibility: 'hidden',
              }}
            >
              {/* Left Image */}
              <div
                className="flex-1 bg-cover bg-center rounded-l-2xl hidden md:block"
                style={{ backgroundImage: "url('/pic22.jpg')" }}
              ></div>

              {/* Right Form */}
              <div className="flex-1 p-10 flex flex-col justify-center min-w-[300px] bg-white rounded-r-2xl">
                <h2 className="text-2xl font-bold mb-2">
                  Hello, <span className="text-[#4318D1]">Welcome Back!</span>
                </h2>

                <div className="flex mb-5">
                  <span className="mr-5 font-semibold text-gray-500 border-b-2 border-[#4318D1] cursor-pointer">Login</span>
                  <span onClick={flipCard} className="font-semibold text-gray-500 cursor-pointer hover:text-[#4318D1]">SignUp</span>
                </div>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full mb-4 p-3 text-sm border-b border-gray-300 focus:outline-none"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                />

                <div className="relative mb-4">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter Password"
                    className="w-full p-3 pr-10 text-sm border-b border-gray-300 focus:outline-none"
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                  />
                  <span className="absolute top-3 right-3 text-gray-500 cursor-pointer" onClick={() => setShowPassword(prev => !prev)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                <div className="flex justify-between text-sm mb-6">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" /> Remember me
                  </label>
                  <span className="text-[#4318D1] cursor-pointer">Forgot Password?</span>
                </div>

                <button className="py-3 bg-[#4318D1] text-white font-bold rounded-lg hover:bg-[#3412a6] transition" onClick={LoginHandler}>Login</button>
              </div>
            </div>

            {/* BACK: Signup */}
            <div
              className="absolute w-full h-full flex flex-row rounded-2xl"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <div className="flex-1 bg-cover bg-center rounded-l-2xl hidden md:block" style={{ backgroundImage: "url('/pic33.jpg')" }}></div>

              <div className="flex-1 p-10 flex flex-col justify-center min-w-[300px] bg-white rounded-r-2xl">
                <h2 className="text-2xl font-bold mb-2">
                  Hello, <span className="text-[#4318D1]">Create your Account!</span>
                </h2>

                <div className="flex mb-5">
                  <span onClick={flipCard} className="mr-5 font-semibold text-gray-500 cursor-pointer hover:text-[#4318D1]">Login</span>
                  <span className="font-semibold text-gray-500 border-b-2 border-[#4318D1] cursor-pointer">SignUp</span>
                </div>

                <div className="flex gap-4 mb-4 flex-col md:flex-row">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="flex-1 p-3 text-sm border-b border-gray-300 focus:outline-none"
                    value={signupFirstName}
                    onChange={e => setSignupFirstName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="flex-1 p-3 text-sm border-b border-gray-300 focus:outline-none"
                    value={signupLastName}
                    onChange={e => setSignupLastName(e.target.value)}
                  />
                </div>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full mb-4 p-3 text-sm border-b border-gray-300 focus:outline-none"
                  value={signupEmail}
                  onChange={e => setSignupEmail(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="Create Password"
                  className="w-full mb-4 p-3 text-sm border-b border-gray-300 focus:outline-none"
                  value={signupPassword}
                  onChange={e => setSignupPassword(e.target.value)}
                />

                <div className="relative mb-6">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    className="w-full p-3 pr-10 text-sm border-b border-gray-300 focus:outline-none"
                    value={signupConfirmPassword}
                    onChange={e => setSignupConfirmPassword(e.target.value)}
                  />
                  <span className="absolute top-3 right-3 text-gray-500 cursor-pointer" onClick={() => setShowConfirmPassword(prev => !prev)}>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                <button className="py-3 bg-[#4318D1] text-white font-bold rounded-lg hover:bg-[#3412a6] transition" onClick={SignupHandler}>Sign Up</button>
              </div>
            </div>

          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthCard;
