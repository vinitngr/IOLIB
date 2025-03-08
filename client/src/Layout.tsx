import { Outlet } from 'react-router-dom'
import Navbar from './components/NavBarSideways'

function Layout() {

  return (
    <div className='max-h-screen h-screen bg-gray-100 flex justify-center'>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default Layout