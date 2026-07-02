import React, { useContext } from 'react'
import {Routes, Route} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import Home from './pages/Home.jsx'
import BuyCredit from './pages/BuyCredit.jsx'
import Result from './pages/Result.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Login from './components/Login.jsx'
import { AppContext } from './context/AppContext.jsx'
import History from './pages/History.jsx'


const App = () => {
  const { showLogin } = useContext(AppContext)
  return (
  <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50 dark:from-gray-900 dark:to-black'>
      <ToastContainer position='bottom-right'/>
      <Navbar/>
      {showLogin &&<Login/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/result' element={<Result/>}/>
        <Route path='/buy' element={<BuyCredit />}/>     
        <Route path='/history' element={<History/>}/>
        
      </Routes> 
      <Footer/>
    </div>
  )
}

export default App