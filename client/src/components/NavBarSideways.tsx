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
    <aside className="fixed top-32 left-2  bg-white/40 shadow-md text-black backdrop:blur-lg backdrop-blur-md rounded p-2 z-50">
      <div className="flex flex-col space-y-4 justify-center items-center">
        <Link to="/" className="text-3xl font-bold">
          IL
        </Link>

        <nav className="flex flex-col space-y-4 mt-4 justify-center items-center"   >
          <Link to="/home" className="hover:text-blue-500 " title="Go to home">
            <Home size={24} />
          </Link>


          <Link to="/form" className="hover:text-blue-500" title="Add Dataset">
           <Plus size={30} />
          </Link>

          <div className="bg-red-500 rounded p-2 text-white  mt-10">
            { !authUser && <Link to="/login" className="hover:text-blue-500"  title="Login"  >
              <LogIn size={20} />
            </Link>}
            { authUser && 
              <div  title='logout' onClick={handlelogout}>
                <LogOut size={20} />
              </div>
            }
          </div>
        </nav>
      </div>
    </aside>
    
  );
};

export default Navbar;

