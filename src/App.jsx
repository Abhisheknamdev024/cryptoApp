import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Coin from './pages/coin/Coin'
import Footer from './components/footer/Footer'

const App = () => {
  return (
    <div className='app'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/coin/:id' element={<Coin/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App