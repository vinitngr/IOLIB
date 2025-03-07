import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./Layout";
import Form from "./pages/Form";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import TestPage from "./components/ui/testPage";
import BooksPage from "@/pages/ApiPage";

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='home' element={<Home/>} />
        <Route path='form' element={<Form/>} />
        <Route path='chat' element={<Chat/>} />
        <Route path='testPage' element={<TestPage/>} />
        <Route path='/login' element={<Login/>} />
        <Route path="/books" element={<BooksPage />} />
        <Route path='/register' element={<Register/>} />
      </Route> 
        
        
    </Routes>
    </>
  )
}

export default App
