import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./Layout";
import Form from "./pages/Form";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import TestPage from "./components/ui/testPage.tsx"

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='home' element={<Home/>} />
        <Route path='form' element={<Form/>} />
        <Route path='chat' element={<Chat/>} />
        <Route path='testpage' element={<TestPage/>} />
      </Route> 
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
    </Routes>
    </>
  )
}

export default App
