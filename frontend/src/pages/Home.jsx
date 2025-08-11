import React from 'react'

const Home = () => {
  console.log('Home component is rendering...')
  
  return (
    <div className="min-h-screen">
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to MStore</h1>
        <p className="text-xl text-gray-600 mb-8">Your one-stop shop for amazing products</p>
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Featured Products</h2>
            <p className="text-gray-600">Discover our latest collection</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
