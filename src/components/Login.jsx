// Login.jsx
import React, { useState } from 'react';
import { useAuth } from './AuthContext'; // Ensure the path is correct
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Include email in the userData
        login({ token: data.token, email });
        alert('Login successful');
        navigate('/'); // Redirect to home or any other route
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Server error');
    }
  };

  return (
    <div className='h-[100vh]'>
      <h1 className='absolute top-[160px] left-[915px] text-xl font-extrabold'>__________</h1>
      <div className='flex text-center justify-center gap-40 mt-10'>
        <h1 className='text-2xl relative'>Sign Up</h1>
        <h1 className='text-2xl'>Sign In</h1>
      </div>
      <div className='mt-10'>
        <h1 className='text-3xl text-center'>Create An Account</h1>
        <form onSubmit={handleSubmit} className='flex flex-col mt-10 gap-10'>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-gray-50 drop-shadow-lg w-[35%] h-14 m-auto text-2xl p-2 rounded-2xl outline-none text-black'
          />
          <input
            type='password'
            name='password'
            id='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-gray-50 drop-shadow-lg w-[35%] h-14 m-auto text-2xl p-2 rounded-2xl outline-none text-black'
          />
          <input
            type='submit'
            value='Sign In'
            className='bg-[#41436A] drop-shadow-lg w-[30%] h-14 m-auto text-2xl p-2 rounded-full outline-none text-white'
          />
          {error && <p className='text-red-500 text-center'>{error}</p>}
        </form>
        <div className='mt-10'>
          <h1 className='flex justify-center text-2xl font-bold mb-10'>----- or sign in with -----</h1>
          <div className='flex w-[20%] m-auto gap-10 mt-10'>
            <a href='' className='flex text-2xl gap-2 border-2 rounded-2xl border-black m- p-2'>
              <img src='/public/Goolge.jpeg' alt='' className='w-8' /> Google
            </a>
            <a href='' className='flex text-2xl gap-2 border-2 rounded-2xl border-black m- p-2'>
              <img src='/public/facebook.jpeg' alt='' className='w-8' /> Facebook
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
