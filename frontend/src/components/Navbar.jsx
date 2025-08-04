import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
return (
    <nav className='flex items-center justify-between py-5 font-medium bg-gray-700 shadow-lg text-white px-10'>
        <NavLink to='/'>
        <img src={assets.logo} className='w-24' alt='Logo' />
        </NavLink>  
        <ul className='flex gap-8'>
            <NavLink to='/' className='hidden md:block'>     
            <li className='hover:text-gray-600 cursor-pointer'>Home</li>
            <hr className='border-none h-[1.5px] w-2/4 bg-gray-100' />
            </NavLink>
            <NavLink to='/collection'>
            <li className='hover:text-gray-600 cursor-pointer'>Shop</li>
            <hr className='border-none h-[1.5px] w-2/4 bg-gray-100' />
            </NavLink>
            <NavLink to='/contact'>
            <li className='hover:text-gray-600 cursor-pointer'>Contact us</li>
            <hr className=' w-2/4 border-none h-[1.5px] bg-gray-100' />
            </NavLink>
            <NavLink to='/about'>
            <li className='hover:text-gray-600 cursor-pointer'>About</li>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-100' />
            </NavLink>
        </ul>
        <div className='flex items-center gap-4'>
            <NavLink to='/Login'>
            <button className='px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition'>Login</button>
            </NavLink>
            <NavLink to='/Signup'>
            <button className='px-4 py-2 border border-white-600 text-white-600 rounded hover:bg-gray-600 transition'>Sign Up</button>
            </NavLink>
        </div>
    </nav>
)
}

export default Navbar
