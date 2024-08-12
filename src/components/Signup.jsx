import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const passwordRef = useRef(null);
  const eyeIconRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  useEffect(() => {
    const postData = async () => {
      if (submitted) {
        try {
          const response = await axios.post('http://localhost:3000/api/signup', formData);
          setResponseMessage('User created successfully');
          console.log('Response:', response.data);
        } catch (error) {
          setResponseMessage('Error creating user');
          console.error('Error:', error.response ? error.response.data : error.message);
        }
        setSubmitted(false);
      }
    };
    postData();
  }, [submitted, formData]);

  const showPassword = () => {
    if (eyeIconRef.current.src.includes("eyecross.png")) {
      eyeIconRef.current.src = "eye.png";
      passwordRef.current.type = "password";
    } else {
      eyeIconRef.current.src = "eyecross.png";
      passwordRef.current.type = "text";
    }
  };

  return (
    <div className='h-[100vh]'>
      <h1 className='absolute top-[160px] left-[675px] font-extrabold text-xl'>__________</h1>
      <div className='flex text-center justify-center gap-40 mt-10'>
        <h1 className='text-2xl relative'>Sign Up</h1>
        <h1 className='text-2xl'>Sign In</h1>
      </div>
      <div className='mt-10'>
        <h1 className='text-3xl text-center'>Create An Account</h1>
        <form onSubmit={handleSubmit} className='flex flex-col mt-10 gap-10 text-center'>
          <input type="text" name="fullname" id="fullname" placeholder='Full Name' value={formData.fullname} onChange={handleChange} className='bg-gray-50 border drop-shadow-lg w-[35%] h-14 m-auto text-2xl p-2 rounded-2xl outline-none text-black' />
          <input type="email" name="email" id="email" placeholder='Email' value={formData.email} onChange={handleChange} className='bg-gray-50 drop-shadow-lg w-[35%] h-14 m-auto text-2xl p-2 rounded-2xl outline-none text-black' />
          <div className='relative w-[35%] m-auto'>
            <input ref={passwordRef} type="password" name="password" id="password" placeholder='Password' value={formData.password} onChange={handleChange} className='bg-gray-50 drop-shadow-lg w-full h-14 text-2xl p-2 pr-12 rounded-2xl outline-none text-black' />
            <span onClick={showPassword} className='absolute inset-y-0 right-3 flex items-center cursor-pointer'>
              <img ref={eyeIconRef} src="/public/eye.png" className='w-6' alt="Toggle visibility" />
            </span>
          </div>
          <input type="submit" name="submit" id="submit" value="Sign Up" className='bg-[#41436A] drop-shadow-lg w-[30%] h-14 m-auto text-2xl p-2 rounded-full outline-none text-white' />
        </form>
        {responseMessage && <div className='text-center mt-4 text-red-500'>{responseMessage}</div>}
        <div className='mt-10'>
          <h1 className='flex justify-center text-2xl font-bold mb-10'>----- or sign up with -----</h1>
          <div className='flex w-[20%] m-auto gap-10 mt-10'>
            <a href="#" className='flex text-2xl gap-2 border-2 rounded-2xl border-black p-2'><img src="/public/Goolge.jpeg" alt="Google" className='w-8' /> Google</a>
            <a href="#" className='flex text-2xl gap-2 border-2 rounded-2xl border-black p-2'><img src="/public/facebook.jpeg" alt="Facebook" className='w-8' /> Facebook</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
