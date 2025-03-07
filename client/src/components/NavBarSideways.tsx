// src/component/Navbar.tsx

import { Link } from "react-router-dom";
import { Home, MessageCircle, FormInput, LogIn, UserPlus, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AiOutlineMoon, AiOutlineSun } from "react-icons/ai";
import { useTheme } from "./ThemeProvider";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  const {darkMode, toggleDarkMode} = useTheme();

   

  return (
    <aside className={`fixed top-0 left-0 h-full w-16  transition-colors ${ darkMode ? "bg-gray-900 text-slate-200" :  "bg-white/90 text-slate-900"} flex flex-col items-center py-6 shadow-[0_0px_15px_rgba(0,0,0,0.50)] z-50`}>
      
      {/* Logo at the top */}
      <div className="mt-20 mb-10">
        <Link to="/" className={`text-3xl ${darkMode ? "text-white/90" : "text-black"} font-bold`}>
          IL
        </Link>
      </div>

      {/* Desktop Menu Icons */}
      <nav className="flex flex-col space-y-8 mt-4">
        <Link to="/home" className="hover:text-blue-500 ">
          <Home size={28} />
        </Link>

        <Link to="/chat" className="hover:text-blue-500  >">
          <MessageCircle size={28} />
        </Link>

        <Link to="/form" className="hover:text-blue-500  >">
          <FormInput size={28} />
        </Link>

        <Link to="/login" className="hover:text-blue-500  >">
          <LogIn size={28} />
        </Link>

        <Link to="/register" className="hover:text-blue-500  >">
          <UserPlus size={28} />
        </Link>

        <button onClick={toggleDarkMode} className=" text-2xl mt-20 text-gray-500 hover:text-gray-700 ">
            {darkMode ? <AiOutlineSun /> : <AiOutlineMoon />}
        </button>
        
      </nav>

      {/* Mobile Menu Toggle (optional for small screens) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden mt-auto mb-4"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Optional mobile dropdown if needed */}
      {isOpen && (
        <div className="absolute left-20 top-0 bg-slate-900 text-white p-4 rounded shadow-md space-y-2">
          <Link to="/" className="flex items-center space-x-2 hover:text-blue-500">
            <Home size={20} /> <span>Home</span>
          </Link>
          <Link to="/chat" className="flex items-center space-x-2 hover:text-blue-500">
            <MessageCircle size={20} /> <span>Chat</span>
          </Link>
          <Link to="/form" className="flex items-center space-x-2 hover:text-blue-500">
            <FormInput size={20} /> <span>Form</span>
          </Link>
          <Link to="/login" className="flex items-center space-x-2 hover:text-blue-500">
            <LogIn size={20} /> <span>Login</span>
          </Link>
          <Link to="/register" className="flex items-center space-x-2 hover:text-blue-500">
            <UserPlus size={20} /> <span>Register</span>
          </Link>
        </div>
      )}
    </aside>
  );
};

export default Navbar;
