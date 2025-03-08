import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineSun, AiOutlineMoon } from "react-icons/ai";
import { IoIosSend } from "react-icons/io";
import { motion } from "framer-motion";
import { Message } from "@/types/types";
import { useTheme } from "./ThemeProvider";
import { axiosInstance } from "@/lib/axios";

const BookLibrary = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();
  const { docsId } = useParams<{ docsId: string }>();

  interface ChatResponse {
    RAGFetched: boolean;
    answer : string ;
    finalData : string ;
  }
  const [chatResponse, setChatResponse] = useState<ChatResponse | null>(null);
  interface ChatData {
    createdAt: string | number | Date;
    docsId: string;
    type: string;
    aboutPdf?: {
      description?: string;
      url?: string | undefined;
      title?: string;
      author?: string;
      category?: string;
    };
    aboutWeb?: {
      description?: string;
      title?: string;
      category?: string;
      language?: string;
    }
    RAG?: {
      retrival?: string;
      tokenPR?: string;
      chunkOverlap?: string;
      strict?: string;
    };
  }
  const [selectedChat, setSelectedChat] = useState<ChatData>({
    createdAt: new Date().toISOString(),
    docsId: '',
    type: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/get/docs/${docsId}`);
        setSelectedChat(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [docsId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const askforSummary = async () => {
      setMessages((prev: Message[]) => [...prev, { sender: "user", text: 'summary' }]);
      const response = await axiosInstance.get(`/chat/${docsId}/summary`)
      const aiResponse: Message = { sender: "ai", text: response.data.summary };
      setMessages((prev: Message[]) => [...prev, aiResponse]);
      setChatResponse(response.data);
      console.log(chatResponse);
  
  }
  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev: Message[]) => [...prev, { sender: "user", text: input }]);
    setInput("");
    setTyping(true);
    try {
      const response = await axiosInstance.post(`/chat/${docsId}/llm`, {
        type: selectedChat.type,
        query: input,
        strict: selectedChat.RAG?.strict || false,
        retrival: selectedChat.RAG?.retrival || 2,
      });

      const aiResponse: Message = { sender: "ai", text: response.data.answer };
      setMessages((prev: Message[]) => [...prev, aiResponse]);
      setChatResponse(response.data);
      console.log(chatResponse);
    } catch (error) {
      console.error("Error sending message:", error);
      const aiResponse: Message = { sender: "ai", text: "Sorry, something went wrong. Please try again." };
      setMessages((prev: Message[]) => [...prev, aiResponse]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className={`flex w-full h-screen p-6 relative transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <button onClick={toggleDarkMode} className="absolute top-5 right-6 text-2xl text-gray-500 hover:text-gray-700 m-5">
        {darkMode ? <AiOutlineSun /> : <AiOutlineMoon />}
      </button>

      <div className={`w-1/3 p-6 flex flex-col  rounded-xl shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="flex items-center space-x-4 mb-6 flex-2">
          {selectedChat.type === 'pdf' ? (
            <img className="h-full rounded-lg w-20" src={selectedChat.aboutPdf?.url} alt="AI Book Library" />
          ) : (
            <div className="h-full w-20 bg-purple-600 text-white flex items-center justify-center text-xl font-bold rounded-lg">WEB</div>
          )}
          <div>
            {selectedChat.aboutPdf && (
              <>
                <h2 className="text-lg font-semibold">{selectedChat.aboutPdf.title}</h2>
                <p className="text-gray-500">{selectedChat.aboutPdf.author}</p>
                <p className="text-gray-500 text-xs line-clamp-2">{selectedChat.aboutPdf.description}</p>
              </>
            )}
          </div>
        </div>
        <div className={`p-4 relative rounded-lg shadow-sm border flex-5 ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"}`}>
          <p className="text-sm h-40 overflow-auto">
            {chatResponse && chatResponse.finalData}
          </p>
          <div className={`absolute  bottom-1 bg-purple-800 px-3 text-xs rounded-full text-white`}> { chatResponse && chatResponse.RAGFetched ? 'Fetched' : 'Not Fetched'} </div>
        </div>

        <div className={`mt-6 p-4 rounded-lg shadow-sm border flex-2 ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"}`}>
          <h3 className="font-semibold mb-2">Book Details</h3>
          <p className="text-sm"><strong>Book ID:</strong> {selectedChat.docsId}</p>
          <p className="text-sm"><strong>Retrieval:</strong> {selectedChat.RAG?.retrival}</p>
          <p className="text-sm"><strong>Chunk Size:</strong> {selectedChat.RAG?.tokenPR}</p>
          <p className="text-sm"><strong>Strict:</strong> {selectedChat.RAG?.strict ? 'true' : 'false'}</p>
          <p className="text-sm"><strong>Date Added:</strong> {new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', day: 'numeric' }).format(new Date(selectedChat.createdAt))}</p>
          <p className="text-sm"><strong>By:</strong> Vinit Nagar</p>
        </div>
      </div>

      <div className={`w-2/3 p-6 ml-6 rounded-xl shadow-md flex flex-col ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <h2 className="text-lg font-semibold">AI Assistant</h2>
        <div className="flex items-center justify-between">
          <p className="mb-4">Ask about the book, and I'll assist you!</p>
          {selectedChat.aboutWeb && <button className="mb-4 cursor-pointer px-2 py-1  border rounded-full"
          onClick={askforSummary}
          >Summary</button>}
        </div>
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