import React from 'react'

const End = () => {
    return (
            <>
        <div className='flex text-justify  mt-10 justify-evenly '>

            <img src="/public/logo.png" className='w-44  inline-block mt-[-55px]  ' alt="" />

            <div className="cards ">
                <h1 className='font-bold text-2xl'>Company</h1>
                <p>Privacy and Terms </p>
                <p>Complain</p>
                <p>Customers Service</p>
                <p>Terms Of use</p>
                About
            </div>
            <div className="cards ">
                <h1 className='font-bold text-2xl'>Contact Us</h1>
                <p className='font-bold'>Email </p>
                dhapdhap61@gmail.com
                <p className='font-bold'>Telephone</p>
                03489486246
                <p className='font-bold'>Address</p>
                Firdous Market Lahore Gulberg III
            </div>
            <div className="cards ">
                <h1 className='font-bold text-2xl'>Abouts Us</h1>
                <li className='list-none'> <a href="/">Home</a></li>
                <li className='list-none'>  <a href="/Contact">Contact us</a></li>
                <li className='list-none'>  <a href="/About">About us</a></li>
            </div>
        
        </div>
        <div className='border-b-4 border-black mb-6 mt-6'></div>
        <div className='flex flex-col justify-center items-center space-y-4'>
            <div className="cards flex space-x-6">
                <a href=""><img src="/public/instagram.jpeg" className='w-8 ' alt="dd" /></a>
                <a href=""><img src="/public/twitter.jpeg" className='w-8 ' alt="dd" /></a>
                <a href=""><img src="/public/facebook.jpeg" className='w-8 ' alt="dd" /></a>
                <a href=""><img src="/public/whatsapp.jpeg" className='w-8 ' alt="dd" /></a>
                <a href=""><img src="/public/tiktok.jpeg" className='w-8 ' alt="dd" /></a>
            </div>
            <div className='h-[20vh] '>
                <p>@copyright All rights reserved.</p>
            </div>
        </div>
        </>
    )
}

export default End