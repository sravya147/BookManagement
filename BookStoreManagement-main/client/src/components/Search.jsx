// components/Search.js

import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:4000/api/book/search?query=${searchTerm}`);
      setSearchResults(response.data);
    } catch (err) {
      setError('Failed to search books. Please try again.');
    }
  };

  const navigateToBook = (bookId) => {
    history.push(`/book/${bookId}`);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Search Books</h1>
      <form onSubmit={handleSearch} className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search books..."
          className="bg-white p-2 rounded-lg shadow-md focus:outline-none w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-700 transition duration-300">
          Search
        </button>
      </form>

      {error && <div className="text-red-500 mt-4">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {searchResults.map((book) => (
          <div key={book._id} className="bg-white p-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer">
            <img
              src={book.image ? `http://localhost:4000/${book.image}` : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
              alt={book.title}
              className="h-48 w-full object-cover mb-4 rounded-md"
            />
            <div className="text-lg font-semibold text-black">{book.title}</div>
            <p className="mt-2 text-sm text-gray-700">by {book.author}</p>
            <button
              onClick={() => navigateToBook(book._id)}
              className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-purple-700 transition duration-300"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
