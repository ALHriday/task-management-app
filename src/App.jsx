import { Outlet } from 'react-router-dom'
import './App.css'
import Footer from './Layouts/Footer'
import Navbar from './Layouts/Navbar'

function App() {

  return (
    <>
      <Navbar></Navbar>
      <div className='min-h-screen p-4'>
        <Outlet />
      </div>
      <Footer></Footer>
    </>
  )
}

export default App
