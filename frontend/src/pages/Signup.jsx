import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('http://localhost:9999/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(data.message)
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        setTimeout(() => {
          navigate('/')
        }, 2000)
      } else {
        setError(data.message || 'Registration failed')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-700'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'> 
        <p className='text-3xl font-bold'>Sign Up</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-700' />
      </div>

      {error && (
        <div className='w-full p-3 bg-red-100 border border-red-400 text-red-700 rounded'>
          {error}
        </div>
      )}

      {success && (
        <div className='w-full p-3 bg-green-100 border border-green-400 text-green-700 rounded'>
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className='flex flex-col items-center w-full gap-4'>
        <input 
          type='text' 
          name='name'
          placeholder='Full Name' 
          value={formData.name}
          onChange={handleInputChange}
          className='w-full px-4 py-2 border border-gray-300 rounded' 
          required
        />
        
        <input 
          type='email' 
          name='email'
          placeholder='Email Address' 
          value={formData.email}
          onChange={handleInputChange}
          className='w-full px-4 py-2 border border-gray-300 rounded' 
          required
        />
        
        <input 
          type='password' 
          name='password'
          placeholder='Password (min 6 characters)' 
          value={formData.password}
          onChange={handleInputChange}
          className='w-full px-4 py-2 border border-gray-300 rounded' 
          required
        />
        
        <input 
          type='password' 
          name='confirmPassword'
          placeholder='Confirm Password' 
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className='w-full px-4 py-2 border border-gray-300 rounded' 
          required
        />

        <button 
          type='submit' 
          disabled={loading}
          className='w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50'
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>

      <div className='text-center'>
        <p className='text-sm text-gray-500'>
          Already have an account? 
          <span className='text-blue-600 cursor-pointer ml-1' onClick={() => navigate('/login')}>
            Login here
          </span>
        </p>
      </div>
    </div>
  )
}

export default Signup
