import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import SignUp from './SignUp'; // Import SignUp component

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check for admin credentials first
      if (email === 'admin@gmail.com' && password === 'admin') {
        setLoading(false);
        navigate('/admin');
        return;
      }

      const response = await axios.post('http://localhost:4000/api/auth/signin', { email, password });
      const { user, token } = response.data;
      signIn(user, token);
      setLoading(false);
      navigate('/profile');
    } catch (err) {
      setLoading(false);
      setError(err.response.data.message || 'Error signing in');
    }
  };

  return (
    <div className='max-w-md mx-auto mt-8'>
      <h1 className='text-3xl font-bold mb-4'>Sign In</h1>
      {error && <p className='text-red-500 mb-4'>{error}</p>}
      <form onSubmit={handleSignIn}>
        <div className='mb-4'>
          <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
            Email:
          </label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-10'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
            Password:
          </label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-10'
          />
        </div>
        <button
          type='submit'
          disabled={loading}
          className='w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
      <div className='flex justify-center mt-4'>
        <p className='text-sm'>
          Don't have an account?{' '}
          <Link to='/signup' className='text-indigo-600'>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
