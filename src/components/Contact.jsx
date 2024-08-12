import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Validate input fields if needed
      if (name.length > 3 && email.length > 3 && address.length > 3 && city.length > 4) { // Example validation for name length
        await axios.post('http://localhost:3000/submit-contact', { name, email, address, city });
        // Reset form fields
        setName('');
        setEmail('');
        setAddress('');
        setCity('');
        alert('Contact saved successfully');
      } else {
        alert('Please check input lengths:\n- Name must be longer than 8 characters.\n- Email must be longer than 18 characters.\n- Address must be longer than 3 characters.\n- City must be longer than 4 characters.');
      }
    } catch (error) {
      console.error(error);
      alert('Error saving contact');
    }
  };

  return (
    <>
      <div className='mt-10'>
        <form className="flex flex-col justify-center w-[50%] m-auto space-y-7 mt-6 h-[90vh]">
          <div className="border-2 border-black rounded-2xl mt-4 mb-4 bg-gray-100">
            <h1 className="flex justify-center mt-4 text-3xl font-bold">Fill This Form</h1>
            <div className="input text-balance mt-4 flex">
              &nbsp;&nbsp;&nbsp;
              <img src="/public/identification.png" className='w-10 h-10 mt-1' alt="" />
              <input type="text" name="name" id="name" className="outline-none bg-gray-300 h-16 py-2 p-2 w-[700px] rounded-2xl text-2xl ml-14" 
                placeholder="Enter Your Name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="input mt-4 flex">
              &nbsp;&nbsp;&nbsp;
              <img src="/public/email.png" className='w-10 h-10 mt-1' alt="" />
              <input type="email" name="email" id="email" className="outline-none bg-gray-300 h-16 py-2 p-2 w-[700px] rounded-2xl text-2xl ml-14" 
                placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="input mt-4 flex">
              <img src="/public/contaminated-city.png" className='w-10 h-10 mt-2 ml-3' alt="" />
              <input type="text" name="address" id="address" className="outline-none bg-gray-300 h-16 py-2 p-2 w-[700px] rounded-2xl text-2xl ml-14" 
                placeholder="Enter Your Address" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div className="input mt-4 mb-5 flex">
              &nbsp;&nbsp;
              <img src="/public/home.png" className='w-10 h-10 mt-2 ml-3' alt="" />
              <input type="text" name="city" id="city" className="outline-none bg-gray-300 h-16 py-2 p-2 w-[700px] rounded-2xl text-2xl text-left ml-12" 
                placeholder="Enter Your City" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
          </div>
          <input type="submit" id="submit" name="submit" className="m-auto text-bold text-2xl border border-black w-fit text-center p-2 rounded-xl bg-gray-300" 
            onClick={handleSubmit} />
        </form>
      </div>
    </>
  );
};

export default Contact;
