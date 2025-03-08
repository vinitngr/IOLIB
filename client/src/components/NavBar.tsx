import { Link } from "react-router-dom";
  
const Navbar = () => {

  return (
    <aside className="w-full bg-transparent shadow-md px-6 py-3 sticky top-0 z-50">
      <div className="max-w-full mx-auto flex justify-around items-center">
        <Link to="/" className="hidden md:flex text-xl pl-20 md:pr-100 font-bold text-slate-900 font-stretch-200">
          IOLIB
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-blue-500">  Home  </Link>
          <Link to="/chat" className="hover:text-blue-500">  Chat  </Link>
          <Link to="/form" className="hover:text-blue-500">  Form  </Link>
          <Link to="/login" className="hover:text-blue-500">  Login  </Link>
          <Link to="/register" className="hover:text-blue-500">  Register  </Link>
        </div>
      </div>
    </aside>
  );
};

export default Navbar;
