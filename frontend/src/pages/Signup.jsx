import React, { useState } from 'react'

const Signup = () => {

  const [currentState,setCurrentState]=useState('SignUp');
  
  return (
    <form className ='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-700'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10 '> 
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-700' />
      </div>
      {currentState === 'Login' ? '':<input type='text' placeholder='Name' className='w-full px-4 py-2 border border-gray-300 rounded ' />}
      <input type='email' placeholder='Email' className='w-full px-4 py-2 border border-gray-300 rounded ' />
      <input type='password' placeholder='Password' className='w-full px-4 py-2 border border-gray- rounded ' />
      {currentState === 'Login' ? '':<input type='password' placeholder='Confirm Password' className='w-full px-4 py-2 border border-gray-300 rounded ' />}

      {currentState === "Login" ? '':<button className='px-4 py-2 border border-white-600 text-white-600 rounded hover:bg-gray-300 transition'>Sign Up</button>}
      {currentState ==='SignUp' ? '':<button className='px-4 py-2 border border-white-600 text-white-600 rounded hover:bg-gray-300 transition'>Login</button>}

      {currentState === 'SignUp'? <p className='text-sm text-gray-500'>Already have an account? <span className='text-blue-600 cursor-pointer' onClick={() => setCurrentState('Login')}>Login</span></p>:''}
      {currentState === 'Login'? <p className='text-sm text-gray-500'>Dont have an account? <span className='text-blue-600 cursor-pointer' onClick={() => setCurrentState('SignUp')}>SignUp</span></p>:''}
    </form>
  )
}

export default Signup
