// components/Header.js

import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { currentUser } = useAuth();

  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 shadow-lg">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="text-white text-2xl font-bold tracking-wide">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-3xl">📚</span>
              <span>BookNest</span>
            </Link>
          </div>
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/"
                className="text-white px-4 py-2 rounded hover:bg-white hover:text-purple-600 transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-white px-4 py-2 rounded hover:bg-white hover:text-purple-600 transition duration-300"
              >
                About
              </Link>
            </li>
            {/* Add more navigation links as needed */}
          </ul>
        </div>
        <form className="bg-white p-2 rounded-lg flex items-center shadow-inner mx-auto" style={{ flex: 1, maxWidth: '600px' }}>
          <input
            type="text"
            placeholder="Search books..."
            className="bg-transparent focus:outline-none w-full text-gray-700"
          />
          <button>
            <FaSearch className="text-purple-600" />
          </button>
        </form>
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <Link to="/profile">
              <img
                className="rounded-full h-10 w-10 object-cover border-2 border-white shadow"
                src={currentUser.avatar}
                alt="profile"
              />
            </Link>
          ) : (
            <Link
              to="/signin"
              className="text-white px-4 py-2 rounded hover:bg-white hover:text-purple-600 transition duration-300"
            >
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
