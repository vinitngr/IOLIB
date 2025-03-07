import { useState, useEffect, useRef } from "react";
import { AiOutlineSun, AiOutlineMoon, AiOutlineHome, } from "react-icons/ai";
import { IoIosSend } from "react-icons/io";
import { motion } from "framer-motion";
import { Message } from "@/types/types";
import { useTheme } from "./ThemeProvider";
import { Link } from "react-router-dom";

const BookLibrary = () => {
  // const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem("chatHistory");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  // useEffect(() => {
  //   document.documentElement.classList.toggle("dark", darkMode);
  //   localStorage.setItem("theme", darkMode ? "dark" : "light");
  // }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);


  // const toggleTheme = () => setDarkMode(!darkMode);
  const {darkMode , toggleDarkMode} = useTheme();

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev: Message[]) => [...prev, { sender: "user", text: input }]);

    setInput("");
    setTyping(true);

    setTimeout(() => {
      const aiResponse: Message = { sender: "ai", text: "Welcome to the AI Book Library! How can I help you today? You can ask for a summary, explanation, or specific details about the book." };
      setMessages((prev: Message[]) => [...prev, aiResponse]);

      setTyping(false);
    }, 1500);
  };


  return (
    <div className={`flex w-full h-screen p-6 relative transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>


      {/* <button onClick={toggleTheme} className="absolute top-5 right-6 text-2xl text-gray-500 hover:text-gray-700 m-5"> */}
      
      {/* Home & Theme Toggle */}
      <Link to="/" className="absolute top-5 right-16 text-2xl text-gray-500 hover:text-gray-700 m-5">
        <AiOutlineHome />
      </Link>


      <button onClick={toggleDarkMode} className="absolute top-5 right-6 text-2xl text-gray-500 hover:text-gray-700 m-5">
        {darkMode ? <AiOutlineSun /> : <AiOutlineMoon />}
      </button>
      {/* Left Panel - Book Details */}
      <div className={`w-1/3 p-6 flex flex-col  rounded-xl shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="flex items-center space-x-4 mb-6 flex-2">
          <div className="h-full w-20 bg-purple-600 text-white flex items-center justify-center text-xl font-bold rounded-lg">
            AM
          </div>
          <div>
            <h2 className="text-lg font-semibold">Advanced Machine Learning</h2>
            <p className="text-gray-500">Dr. Sarah Chen</p>
          </div>
        </div>

        {/* Content Preview */}
        <div className={`p-4 rounded-lg shadow-sm border flex-5 ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"}`}>
          <h3 className="font-semibold mb-2">Chapter 4: Neural Networks</h3>
          <p className="text-sm h-40 overflow-auto">
            The fundamental building block of a neural network is the neuron, also called a node or unit.
            Each neuron receives input from some other nodes, or from an external source, and computes
          </p>
        </div>

        {/* Book Details */}
        <div className={`mt-6 p-4 rounded-lg shadow-sm border flex-3 ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"}`}>
          <h3 className="font-semibold mb-2">Book Details</h3>
          <p className="text-sm"><strong>Book ID:</strong> BK-2023-0142</p>
          <p className="text-sm"><strong>Date Added:</strong> 2023-09-15</p>
        </div>
      </div>

      {/* Right Panel - AI Assistant */}
      <div className={`w-2/3 p-6 ml-6 rounded-xl shadow-md flex flex-col ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <h2 className="text-lg font-semibold">AI Assistant</h2>
        <p className="mb-4">Ask about the book, and I'll assist you!</p>

        <div
          ref={chatContainerRef}
          className="flex-grow p-4 rounded-lg shadow-sm border overflow-auto"
        >
          {messages.map((msg: Message, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: msg.sender === "user" ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-2 my-1 rounded-lg w-fit max-w-xl ${msg.sender === "user" ? "ml-auto bg-blue-500 text-white" : "mr-auto bg-gray-300 text-gray-900"
                }`}
            >
              {msg.text}
            </motion.div>
          ))}
          {typing && <p className="text-sm text-gray-400">AI is typing...</p>}
        </div>



        {/* Input Field */}
        <div className="mt-4 flex items-center border border-gray-300 rounded-lg p-2">
          <input
            type="text"
            placeholder="Ask about the book..."
            className="w-full outline-none bg-transparent px-2 placeholder:text-gray-400 text-white-900"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMessage} className="bg-purple-500 hover:bg-purple-700 text-white px-6 py-4 rounded-lg ">
            <IoIosSend className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookLibrary;
