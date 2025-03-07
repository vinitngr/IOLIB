import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Outlet, useNavigate } from 'react-router-dom'

function Layout() {

  const navigate = useNavigate()
  return (
    <div className='max-h-screen h-screen bg-gray-100 flex justify-center'>
      <div 
      onClick={()=>navigate(-1)}
      className='fixed top-0 left-0 m-2 z-100 '><ArrowLeft/></div>
      <div 
      onClick={()=>navigate(1)}
      className='fixed top-0 left-5 m-2 z-100'><ArrowRight/></div>
      <Outlet/>
    </div>
  )
}

export default Layout