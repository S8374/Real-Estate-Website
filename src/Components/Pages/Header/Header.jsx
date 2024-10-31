import React, { useState, useEffect, useContext } from 'react';
import { FaShoppingBag, FaRegUser, FaUserCircle, FaTimes } from 'react-icons/fa';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import './Header.scss';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import { updateProfile } from 'firebase/auth';
import { FaAngleDown } from "react-icons/fa6";
import { sendPasswordResetEmail } from 'firebase/auth';
import auth from '../../../Firebase/Firebase.config';

const Header = () => {
  const [isNavbarActive, setIsNavbarActive] = useState(false);
  const [isCartActive, setIsCartActive] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isForgotPasswordVisible, setIsForgotPasswordVisible] = useState(false);
  const { register, logIn, user, logOut } = useContext(AuthContext);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State to track password visibility

  const toggleNavbarMenu = () => {
    setIsNavbarActive(!isNavbarActive);
  };

  const toggleCart = () => {
    setIsCartActive(!isCartActive);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    setIsRegistering(false);
    setIsForgotPasswordVisible(false);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible); // Toggle password visibility
  };

  const handelForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, e.target.email.value);
      alert('Check your email for a password reset link.');
      setIsForgotPasswordVisible(false);
    } catch (error) {
      console.error('Error sending password reset email:', error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsNavbarActive(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handelRegister = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get('email');
    const name = form.get('name');
    const password = form.get('password');

    try {
      const result = await register(email, password);
      const user = result.user;
      await updateProfile(user, { displayName: name });
      alert('Account created successfully!');
      closeModal();
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/email-already-in-use') {
        alert('This email is already in use. Please use a different email.');
      } else {
        alert('Error creating account: ' + error.message);
      }
    }
  };

  const handelLogOut = () => {
    logOut().then().catch();
  };

  const handelLogin = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get('email');
    const password = form.get('password');

    try {
      await logIn(email, password);
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='headerContainer'>
      <header className="header">
        <nav className="navbar container">
          <a href="./index.html" className="brand">Residential</a>
          <div className={`menu ${isNavbarActive ? 'is-active' : ''}`} id="menu">
            <button onClick={toggleNavbarMenu} className="close-menu">
              <FaTimes /> {/* Close menu button */}
            </button>
            <ul className="menu-inner">
              <li className="menu-item">
                <NavLink to="/" className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}>Home</NavLink>
              </li>
              <li className="menu-item">
                <NavLink to="/details" className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}>Details</NavLink>
              </li>
              <li className="menu-item">
                <NavLink to="/Profile" className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}>Profile</NavLink>
              </li>
              <li className="menu-item">
                <NavLink to="/properties" className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}>Properties</NavLink>
              </li>
            </ul>
          </div>
          <div className="menu-block">
            <button id="cart-btn" role="button" onClick={toggleCart}>
              <FaShoppingBag />
            </button>
            <div>
              {user ? (
                <div className='flex'>
                  <FaUserCircle />
                  <button className="focus:outline-none" onClick={toggleMenu}>
                    <FaAngleDown />
                  </button>
                  {isMenuVisible && (
                    <div className="absolute flex flex-col w-40 mt-1 border shadow-lg">
                      <NavLink className="flex items-center h-8 px-3 text-sm hover:bg-gray-200" to={'/Profile'}>Profile</NavLink>
                      <a className="flex items-center h-8 px-3 text-sm hover:bg-gray-200" href="#" onClick={handelLogOut}>Logout</a>
                    </div>
                  )}
                </div>
              ) : (
                <button id="user-btn" role="button" onClick={toggleModal}>
                  <FaRegUser />
                </button>
              )}
            </div>
          </div>
          <div className="burger ml-2" onClick={toggleNavbarMenu}>
            <span className="burger-line"></span>
            <span className="burger-line"></span>
            <span className="burger-line"></span>
          </div>
        </nav>
      </header>

      {isModalVisible && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-800 bg-opacity-50">
          <div className="relative p-4 w-full max-w-md">
            <div className="bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex justify-between p-5 border-b">
                <h3 className="text-xl font-semibold">
                  {isRegistering ? 'Create an Account' : isForgotPasswordVisible ? 'Reset Password' : 'Sign in to our platform'}
                </h3>
                <button onClick={closeModal} className="text-black text-3xl">
                  <FaTimes />
                </button>
              </div>

              <div className="p-5">
                {isForgotPasswordVisible ? (
                  <form onSubmit={handelForgotPassword} className="space-y-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Enter your email</label>
                    <input type="email" name="email" required className="w-full p-2.5 border rounded-lg bg-gray-50" />
                    <button type="submit" className="w-full p-2.5 text-white bg-blue-600 rounded-lg hover:bg-blue-700">Send Reset Link</button>
                  </form>
                ) : !isRegistering ? (
                  <form onSubmit={handelLogin} className="space-y-4">
                    {/* Login Form */}
                    <label htmlFor="email">Your email</label>
                    <input type="email" name="email" required className="w-full p-2.5 border rounded-lg" />
                    <label htmlFor="password">Your password</label>
                    <div className="relative">
                      <input 
                        type={isPasswordVisible ? 'text' : 'password'} 
                        name="password" 
                        required 
                        className="w-full p-2.5 border rounded-lg" 
                      />
                      <button 
                        type="button" 
                        onClick={togglePasswordVisibility} 
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                      >
                        {isPasswordVisible ? <FaEyeSlash /> : <FaEye />} {/* Toggle eye icon */}
                      </button>
                    </div>
                    <button type="submit" className="w-full p-2.5 text-white bg-blue-600 rounded-lg hover:bg-blue-700">Login</button>
                    <p onClick={() => setIsForgotPasswordVisible(true)} className="text-sm cursor-pointer text-blue-600 hover:underline">Forgot password?</p>
                    <p onClick={() => setIsRegistering(true)} className="text-sm cursor-pointer text-blue-600 hover:underline">Create an account</p>
                  </form>
                ) : (
                  <form onSubmit={handelRegister} className="space-y-4">
                    {/* Register Form */}
                    <label htmlFor="name">Your name</label>
                    <input type="text" name="name" required className="w-full p-2.5 border rounded-lg" />
                    <label htmlFor="email">Your email</label>
                    <input type="email" name="email" required className="w-full p-2.5 border rounded-lg" />
                    <label htmlFor="password">Your password</label>
                    <div className="relative">
                      <input 
                        type={isPasswordVisible ? 'text' : 'password'} 
                        name="password" 
                        required 
                        className="w-full p-2.5 border rounded-lg" 
                      />
                      <button 
                        type="button" 
                        onClick={togglePasswordVisibility} 
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                      >
                        {isPasswordVisible ? <FaEyeSlash /> : <FaEye />} {/* Toggle eye icon */}
                      </button>
                    </div>
                    <button type="submit" className="w-full p-2.5 text-white bg-blue-600 rounded-lg hover:bg-blue-700">Register</button>
                    <p onClick={() => setIsRegistering(false)} className="text-sm cursor-pointer text-blue-600 hover:underline">Already have an account? Log in</p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
