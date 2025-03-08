import { Link } from "react-router-dom";

import { Home, MessageCircle, FormInput, LogIn, UserPlus} from "lucide-react";


const Navbar = () => {

   

  return (
    <aside className="fixed top-0 left-0 h-full w-16  transition-colors bg-white/90 text-slate-900 flex flex-col items-center py-6 shadow-[0_0px_15px_rgba(0,0,0,0.50)] z-50">
      
      {/* Logo at the top */}
      <div className="mt-20 mb-10">
        <Link to="/" className="text-3xl font-bold">
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
        
      </nav>
    </aside>
  );
};

export default Navbar;

