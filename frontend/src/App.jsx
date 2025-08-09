import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home.jsx'
import Collection from './pages/collection.jsx'
import Contact from './pages/contact.jsx'
import About from './pages/about.jsx'
import Product from './pages/product.jsx'
import Cart from './pages/cart.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import PlaceOrder from './pages/placeOrder.jsx'
import Orders from './pages/orders.jsx'
import Navbar from './components/NavBar.jsx'


const App = () => {
  return (
    <div className='bg-gray-100 p-4 sm:px-[5vw] md:px-[10vw] lg:px-[7vw] xl:px-[9vw]'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/place-Order' element={<PlaceOrder />} />
        <Route path='/order' element={<Orders />} />
      </Routes>
    </div>
  )
}

export default App