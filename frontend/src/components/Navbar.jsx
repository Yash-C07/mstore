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
                 <hr className='border-none h-[1.5px] w-2/4 bg-gray-100 hidden' />
            </NavLink>
            <NavLink to='/collection'>
            <li className='hover:text-gray-600 cursor-pointer'>Shop</li>
                <hr className='w-2/4 border-none h-[1.5px]  bg-gray-100 hidden' />
            </NavLink>
            <NavLink to='/contact'>
            <li className='hover:text-gray-600 cursor-pointer'>Contact us</li>
                <hr className=' w-2/4 border-none h-[1.5px] bg-gray-100 hidden' />
            </NavLink>
            <NavLink to='/about'>
            <li className='hover:text-gray-600 cursor-pointer'>About</li>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-100 hidden' />
            </NavLink>
        </ul>
        <div className='flex items-center gap-4'>
            {!localStorage.getItem('token') ? (
              <>
                <NavLink to='/login'>
                  <button className='px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition'>Login</button>
                </NavLink>
                <NavLink to='/signup'>
                  <button className='px-4 py-2 border border-white-600 text-white-600 rounded hover:bg-gray-600 transition'>Sign Up</button>
                </NavLink>
              </>
            ) : (
              <>
                <span className='text-white text-sm'>
                  Welcome, {JSON.parse(localStorage.getItem('user'))?.name || 'User'}
                </span>
                <button 
                  onClick={() => {
                    localStorage.removeItem('token')
                    localStorage.removeItem('user')
                    window.location.reload()
                  }}
                  className='px-4 py-2 border border-red-400 text-red-400 rounded hover:bg-red-400 hover:text-white transition'
                >
                  Logout
                </button>
              </>
            )}
        </div>
        <div className='flex items-center gap-4'>
            <img src={assets.searchI} className = 'w-5 cursor-pointer' alt="" />
            <div className='group relative'>
                <img src={assets.profileI} className='w-5 cursor-pointer' alt='profile-info'/>
                <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 '>
                    <div className='bg-gray-100 text-gray-700 flex flex-col gap 2 px-5 py-3 w-36 rounded shadow-lg'>
                    <ul>
                        <NavLink to='/'>
                            <li className='hover:text-black cursor-pointer'>My profile</li>
                        </NavLink>
                        <NavLink to='/orders'>
                            <li className=' hover:text-black cursor-pointer'>Orders</li>
                        </NavLink>
                        <NavLink to='/login'>
                            <li className=' hover:text-black cursor-pointer'>Logout</li>
                        </NavLink>
                    </ul>  
                    </div>
            
                  </div>
            </div>
        </div>
    </nav>
)
}

export default Navbar 