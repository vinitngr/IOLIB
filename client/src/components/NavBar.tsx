// src/component/Navbar.tsx

import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="w-full bg-transparent shadow-md px-6 py-3 sticky top-0 z-50">
      <div className="max-w-full mx-auto flex justify-around items-center">
        {/* Logo */}
        <Link to="/" className="hidden md:flex text-xl pl-20 md:pr-100 font-bold text-slate-900 font-stretch-200">
          IOLIB
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-blue-500">  Home  </Link>
          <Link to="/chat" className="hover:text-blue-500">  Chat  </Link>
          <Link to="/form" className="hover:text-blue-500">  Form  </Link>
          <Link to="/login" className="hover:text-blue-500">  Login  </Link>
          <Link to="/register" className="hover:text-blue-500">  Register  </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-800"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 space-y-2">
          <Link to="/" className="block px-2 py-1 hover:text-blue-500"> Home </Link>
          <Link to="/chat" className="block px-2 py-1 hover:text-blue-500"> Chat </Link>
          <Link to="/form" className="block px-2 py-1 hover:text-blue-500"> Form </Link>
          <Link to="/login" className="block px-2 py-1 hover:text-blue-500"> Login </Link>
          <Link to="/register" className="block px-2 py-1 hover:text-blue-500"> Register </Link>
        </div>
      )}
    </aside>
  );
};

export default Navbar;
