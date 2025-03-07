import { Link } from "react-router-dom";
import { Home, MessageCircle, FormInput, LogIn, UserPlus } from "lucide-react";

const Navbar = () => {
  return (
    <aside className="fixed top-0 left-0 h-full w-16 bg-white text-black flex flex-col items-center py-4 shadow-lg z-50">
      
      <Link to="/" className="text-2xl font-bold mt-10 mb-6">IL</Link>

      <nav className="flex flex-col space-y-6">
        <Link to="/home" className="hover:text-blue-500">
          <Home size={24} />
        </Link>

        <Link to="/chat" className="hover:text-blue-500">
          <MessageCircle size={24} />
        </Link>

        <Link to="/form" className="hover:text-blue-500">
          <FormInput size={24} />
        </Link>

        <Link to="/login" className="hover:text-blue-500">
          <LogIn size={24} />
        </Link>

        <Link to="/register" className="hover:text-blue-500">
          <UserPlus size={24} />
        </Link>
      </nav>
    </aside>
  );
};

export default Navbar;
