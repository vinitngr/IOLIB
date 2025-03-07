import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./Layout";
import Form from "./pages/Form";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import TestPage from "./components/ui/testPage";
import { useEffect, useState } from "react";
import { useAuthStore } from "./stores/authStore";
import { Loader } from "lucide-react";

function App() {
  const [ isloading , setisloading] = useState(true)
  const { checkAuth, authUser } = useAuthStore()


  useEffect(() => {
    const checkAuthStatus = async () => {
      await checkAuth();
      setisloading(false);
    };

    checkAuthStatus();
  }, [checkAuth]);

  return (
    <>
    {isloading ?
        <div className="flex items-center justify-center h-screen">
          <Loader className="size-10 animate-spin" />
        </div> :
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={authUser ? <Home /> : <Navigate to="/login" replace />} />
          <Route path="form" element={authUser ? <Form /> : <Navigate to="/login" replace />} />
          <Route path="chat" element={authUser ? <Chat /> : <Navigate to="/login" replace />} />
          <Route path="testPage" element={authUser ? <TestPage /> : <Navigate to="/login" replace />} />
        </Route>
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/home" replace />} />
        <Route path="/register" element={!authUser ? <Register /> : <Navigate to="/home" replace />} />
        <Route path="*" element={<Navigate to={authUser ? "/home" : "/login"} replace />} />
      </Routes>
}
    </>

  )
}

export default App
