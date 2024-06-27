import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SignOut from '../pages/SignOut'; // Import SignOut component
import BookForm from '../components/BookForm'; // Import BookForm component

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState({ username: '', email: '', password: '', avatar: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser && Object.keys(currentUser).length > 0) {
      setUserData({
        username: currentUser.username || '',
        email: currentUser.email || '',
        password: '',
        avatar: currentUser.avatar || '',
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!currentUser || !currentUser._id) {
        throw new Error('User ID is missing');
      }
      const response = await axios.post(`http://localhost:4000/api/user/update/${currentUser._id}`, userData);
      setLoading(false);
      setError('');
      localStorage.setItem('currentUser', JSON.stringify(response.data));
      alert('Profile updated successfully');
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Error updating profile');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      try {
        if (!currentUser || !currentUser._id) {
          throw new Error('User ID is missing');
        }
        await axios.delete(`http://localhost:4000/api/user/delete/${currentUser._id}`);
        navigate('/');
      } catch (err) {
        setError(err.response?.data?.message || 'Error deleting account');
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-center">Profile Page</h1>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <div className="mb-8 flex flex-col items-center justify-center">
        {userData.avatar && (
          <div className="w-32 h-32 mb-4 rounded-full overflow-hidden">
            <img src={userData.avatar} alt="Avatar" className="w-full h-full object-cover" />
          </div>
        )}
        <form onSubmit={handleUpdate} className="w-full">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Username:</label>
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
      <button
        onClick={handleDelete}
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Delete Account
      </button>
      <div className="mt-8">
        <button
          onClick={() => navigate('/BookForm')}
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add Book
        </button>
      </div>
      <SignOut /> {/* Include the SignOut component here */}
    </div>
  );
};

export default ProfilePage;
