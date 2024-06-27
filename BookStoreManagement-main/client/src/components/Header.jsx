// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaSearch } from 'react-icons/fa';
// import { useState, useEffect } from 'react';

// // export default function Header() {
//   const { currentUser } = useSelector((state) => state.user);
//   const [searchTerm, setSearchTerm] = useState('');
//   const navigate = useNavigate();

//   return (
//     <header className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 shadow-lg">
//       <nav className="container mx-auto flex justify-between items-center">
//         <div className="flex items-center space-x-4">
//           <div className="text-white text-2xl font-bold tracking-wide">

//               <Link 
//                 to="/" 
//               >
//                 BookStore
//               </Link>
//           </div>
//           <ul className="flex space-x-4">
//             <li>
//               <Link 
//                 to="/" 
//                 className="text-white px-4 py-2 rounded hover:bg-white hover:text-purple-600 transition duration-300"
//               >
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link 
//                 to="/about" 
//                 className="text-white px-4 py-2 rounded hover:bg-white hover:text-purple-600 transition duration-300"
//               >
//                 About
//               </Link>
//             </li>
//           </ul>
//         </div>
//         <form
//           className="bg-white p-2 rounded-lg flex items-center shadow-inner mx-auto"
//           style={{ flex: 1, maxWidth: '600px' }}
//         >
//           <input
//             type="text"
//             placeholder="Search books..."
//             className="bg-transparent focus:outline-none w-full text-gray-700"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button>
//             <FaSearch className="text-purple-600" />
//           </button>
//         </form>
//         <div className="flex items-center space-x-4">
//           {currentUser ? (
//             <Link to="/profile">
//               <img
//                 className="rounded-full h-10 w-10 object-cover border-2 border-white shadow"
//                 src={currentUser.avatar}
//                 alt="profile"
//               />
//             </Link>
//           ) : (
//             <Link 
//               to="/signin" 
//               className="text-white px-4 py-2 rounded hover:bg-white hover:text-purple-600 transition duration-300"
//             >
//               Sign In
//             </Link>
//           )}
//         </div>
//       </nav>
//     </header>
//   );
// }


// src/components/Header.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 shadow-lg">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="text-white text-2xl font-bold tracking-wide">
            <Link to="/">BookStore</Link>
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
          </ul>
        </div>
        <form
          className="bg-white p-2 rounded-lg flex items-center shadow-inner mx-auto"
          style={{ flex: 1, maxWidth: '600px' }}
        >
          <input
            type="text"
            placeholder="Search books..."
            className="bg-transparent focus:outline-none w-full text-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
}
