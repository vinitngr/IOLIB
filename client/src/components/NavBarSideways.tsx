import { Link } from "react-router-dom";

import { Home, LogIn,  LogOut,  Plus} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { axiosInstance } from "@/lib/axios";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const { authUser } = useAuthStore();
  const navigate = useNavigate()
  const handlelogout= async () =>{
    const res = await axiosInstance.get('/auth/logout')
    console.log(res);
    navigate(0)
  }
  return (
    <aside className="fixed top-0 left-0 h-full w-16  transition-colors bg-white/90 text-slate-900 flex flex-col items-center py-6 shadow-[0_0px_15px_rgba(0,0,0,0.50)] z-50">
      
      <div className="mt-20 mb-10" >
        <Link to="/" className="text-3xl font-bold">
          IL
        </Link>
      </div>

      <nav className="flex flex-col space-y-8 mt-4"   >
        <Link to="/home" className="hover:text-blue-500 " title="Go to home">
          <Home size={28} />
        </Link>


        <Link to="/form" className="hover:text-blue-500" title="Add Dataset">
         <Plus/>
        </Link>

        { !authUser && <Link to="/login" className="hover:text-blue-500"  title="Login"  >
          <LogIn size={28} />
        </Link>}
        { authUser && 
          <div  title='logout' onClick={handlelogout}>
            <LogOut size={28} />
          </div>
        }
        
      </nav>
    </aside>
  );
};

export default Navbar;

