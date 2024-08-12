// Navbar.jsx
import React from 'react';
import { useAuth } from './AuthContext';
import { useNavigate, NavLink } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex justify-center text-center bg-gray-50 w-full pr-20">
      <div className="logo">
        <img src="/public/logo2.png" className='w-[20%] bg-gray-50 invert-0' alt="" />
      </div>
      <div className='mt-[3%]'>
        <nav>
          <ul className='flex space-x-8'>
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive ? 'text-xl font-semibold' : 'text-xl hover:font-semibold'}
            >
              Home
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                isActive ? 'text-xl font-semibold' : 'text-xl hover:font-semibold'}
            >
              Contact
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                isActive ? 'text-xl font-semibold' : 'text-xl hover:font-semibold'}
            >
              About
            </NavLink>
          </ul>
        </nav>
      </div>
      <div>
        {user ? (
          <button onClick={handleLogout} className='text-xl hover:font-semibold absolute top-12 right-14'>
            <span className='showemail hover:font-normal'>{user.email}</span> Logout
          </button>
        ) : (
          <ul className='flex gap-3 mt-12 ml-[300%]'>
            <NavLink 
              to="/signup" 
              className={({ isActive }) => 
                isActive ? 'text-xl font-semibold' : 'text-xl hover:font-semibold'}
            >
              Signup
            </NavLink>
            <NavLink 
              to="/login" 
              className={({ isActive }) => 
                isActive ? 'text-xl font-semibold' : 'text-xl hover:font-semibold'}
            >
              Login
            </NavLink>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
