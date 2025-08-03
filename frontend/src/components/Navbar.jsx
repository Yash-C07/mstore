import React from 'react'
import { assets } from '../assets/assets'

const NavBar = () => {
return (
    <nav className='flex items-center justify-between py-5 font-medium bg-white shadow-md px-8'>
        <img src={assets.logo} className='w-36' alt='Logo' />
        <ul className='flex gap-8'>
            <li className='hover:text-blue-600 cursor-pointer'>Home</li>
            <li className='hover:text-blue-600 cursor-pointer'>Shop</li>
            <li className='hover:text-blue-600 cursor-pointer'>About</li>
            <li className='hover:text-blue-600 cursor-pointer'>Contact</li>
        </ul>
        <div className='flex items-center gap-4'>
            <button className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'>Login</button>
            <button className='px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition'>Sign Up</button>
        </div>
    </nav>
)
}

export default NavBar
