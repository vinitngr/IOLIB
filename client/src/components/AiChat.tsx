import { useState, useEffect, useRef, KeyboardEvent } from "react"; // Added KeyboardEvent
import { useParams } from "react-router-dom";
import { FiSun, FiMoon, FiSend, FiFileText, FiGlobe, FiInfo, FiCheckCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion"; // Keep framer-motion
import { Message } from "@/types/types";
import { useTheme } from "./ThemeProvider";
import { axiosInstance } from "@/lib/axios";
import "../App.css";
import MarkDown from "./MarkDown";

interface ChatResponse {
    RAGFetched: boolean;
    answer : string ;
    finalData : string ;
    tokens : { totalToken : number}
}
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


const BookLibrary = () => {
  // State remains EXACTLY the same
  const [messages, setMessages] = useState<Message[]>([]);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();
  const { docsId } = useParams<{ docsId: string }>();
  const [chatResponse, setChatResponse] = useState<ChatResponse | null>(null);
  const [selectedChat, setSelectedChat] = useState<ChatData>({ 
    createdAt: new Date().toISOString(),
    docsId: '',
    type: '',
    aboutPdf: {},
    aboutWeb: {},
    RAG: {}
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!docsId) return; // Added guard just in case
      try {
        const response = await axiosInstance.get(`/get/docs/${docsId}`);
        setSelectedChat(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (docsId) {
        fetchData();
    }
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
      if (!docsId || typing) return;
      setMessages((prev: Message[]) => [...prev, { sender: "user", text: 'summary' }]);
      setTyping(true); 
      setChatResponse(null);
      try {
          const response = await axiosInstance.get(`/chat/${docsId}/summary`)
          const aiResponse: Message = { sender: "ai", text: response.data.summary };
          setMessages((prev: Message[]) => [...prev, aiResponse]);
          setChatResponse(response.data); 
      } catch(error) {
          console.error("Error fetching summary:", error);
           const aiResponse: Message = { sender: "ai", text: "Sorry, I couldn't get the summary." };
           setMessages((prev: Message[]) => [...prev, aiResponse]);
      } finally {
          setTyping(false);
      }
  }

  const sendMessage = async () => {
    if (!input.trim() || !docsId || typing) return; // Added guard

    const userMessage: Message = { sender: "user" as const, text: input }; 
    setMessages((prev: Message[]) => [...prev, userMessage]);
    const currentInput = input; 
    setInput("");
    setTyping(true);
    setChatResponse(null); 

    try {
      const response = await axiosInstance.post(`/chat/${docsId}/llm`, {
        type: selectedChat.type,
        query: currentInput, 
        strict: selectedChat.RAG?.strict || false,
        retrival: selectedChat.RAG?.retrival || 2,
        description : selectedChat.aboutPdf?.description || selectedChat.aboutWeb?.description || 'No description provided'
      });

      const aiResponse: Message = { sender: "ai", text: response.data.answer };
      setMessages((prev: Message[]) => [...prev, aiResponse]);
      setChatResponse(response.data); 
    } catch (error) {
      console.error("Error sending message:", error);
      const aiResponse: Message = { sender: "ai", text: "Sorry, something went wrong. Please try again." };
      setMessages((prev: Message[]) => [...prev, aiResponse]);
    } finally {
      setTyping(false);
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); 
      sendMessage(); 
    }
  };


  return (
    <div className={`flex w-full h-screen transition-colors duration-300 ${darkMode ? "bg-slate-900 text-slate-200" : "bg-gradient-to-br from-sky-50 via-white to-blue-100 text-slate-800"}`}>
       <button
        onClick={toggleDarkMode}
        title="Toggle Theme"
        className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${darkMode ? "text-yellow-400 hover:bg-slate-700 focus:ring-yellow-500 focus:ring-offset-slate-900" : "text-slate-600 hover:bg-blue-100 focus:ring-blue-500 focus:ring-offset-white"}`}
      >
        {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
      </button>

      <aside className={`w-1/3 h-full flex flex-col p-6 border-r transition-colors ${darkMode ? "bg-slate-800/30 border-slate-700" : "bg-white/50 border-blue-100"}`}>

        <div className="flex items-start space-x-4 mb-5 pb-5 border-b border-dashed border-slate-300 dark:border-slate-600">
          <div className={`flex-shrink-0 w-16 h-16 rounded-lg flex items-center justify-center shadow-sm ${selectedChat.type === 'pdf' ? (darkMode ? 'bg-indigo-700' : 'bg-indigo-500') : (darkMode ? 'bg-teal-700' : 'bg-teal-500')} text-white`}>
             {selectedChat.type === 'pdf' ? <FiFileText size={32} /> : <FiGlobe size={32} />}
          </div>
          <div className="flex-grow min-w-0">
             <h2 className="text-lg font-semibold truncate" title={selectedChat.aboutPdf?.title || selectedChat.aboutWeb?.title}>
                {selectedChat.aboutPdf?.title || selectedChat.aboutWeb?.title || "Document Title"}
             </h2>
             {selectedChat.type === 'pdf' && selectedChat.aboutPdf?.author && (
                <p className="text-sm text-slate-500 dark:text-slate-400 truncate" title={selectedChat.aboutPdf.author}>
                    by {selectedChat.aboutPdf.author}
                </p>
            )}
             <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 line-clamp-2">
                {selectedChat.aboutPdf?.description || selectedChat.aboutWeb?.description || "No description available."}
             </p>
          </div>
        </div>

        {chatResponse?.finalData && (
             <div className={`mb-4 p-3 rounded-md text-xs overflow-y-auto flex-1 custom-scrollbar ${darkMode ? 'bg-slate-700/50' : 'bg-blue-50/50 border border-blue-100'}`}>
                <h3 className="font-medium text-xs mb-1 text-slate-500 dark:text-slate-400">Retrieved Context Snippet:</h3>
                {chatResponse.finalData}
            </div>
        )}

         <div className="mt-auto pt-5 border-t border-dashed border-slate-300 dark:border-slate-600 space-y-2 text-xs">
            <h3 className="text-sm font-medium mb-2 text-slate-600 dark:text-slate-400">Processing Info</h3>
            <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Retrieval Mode:</span>
                <span className="font-medium">{selectedChat.RAG?.strict === 'true' ? 'Strict' : 'Standard'}</span>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Retrieval Count:</span>
                <span className="font-medium">{selectedChat.RAG?.retrival ?? 'N/A'}</span>
            </div>
             {chatResponse && (
                <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700 flex flex-col space-y-1">
                     <div className={`flex items-center justify-center px-2 py-1 rounded text-xs font-medium ${chatResponse.RAGFetched ? (darkMode ? 'bg-green-800 text-green-200' : 'bg-green-100 text-green-700') : (darkMode ? 'bg-yellow-800 text-yellow-200' : 'bg-yellow-100 text-yellow-700')}`}>
                        {chatResponse.RAGFetched ? <FiCheckCircle className="mr-1" /> : <FiInfo className="mr-1" />}
                        Context: {chatResponse.RAGFetched ? 'Retrieved' : 'Generated'}
                     </div>
                      {chatResponse?.tokens?.totalToken > 0 && (
                         <div className={`flex items-center justify-center px-2 py-1 rounded text-xs font-medium ${darkMode ? 'bg-blue-800 text-blue-200' : 'bg-blue-100 text-blue-700'}`}>
                            Tokens Used: {chatResponse.tokens.totalToken}
                         </div>
                     )}
                 </div>
             )}
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                 <span className="text-slate-500 dark:text-slate-400">Added:</span>
                 <span className="font-medium">
                    {new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(selectedChat.createdAt))}
                 </span>
            </div>
         </div>

      </aside>


      <main className="w-2/3 h-full flex flex-col">
         <header className={`px-6 py-4 flex items-center justify-between border-b shrink-0 ${darkMode ? 'border-slate-700' : 'border-blue-100'}`}>
            <h2 className="text-lg font-semibold">AI Assistant</h2>
             <button
                onClick={askforSummary}
                disabled={typing || !docsId} 
                className={`text-sm font-medium px-3 py-1 rounded-full transition-all ${darkMode
                    ? 'bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800/50 disabled:text-indigo-400 text-white'
                    : 'bg-indigo-100 hover:bg-indigo-200 disabled:bg-indigo-50 text-indigo-700 disabled:text-indigo-400'
                } ${typing || !docsId ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
                Get Summary
            </button>
        </header>

        <div
          ref={chatContainerRef}
          className="flex-grow p-6 overflow-y-auto space-y-4 custom-scrollbar" 
        >
          <AnimatePresence>
            {messages.map((msg: Message, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 border border-white/10 rounded max-w-lg lg:max-w-xl shadow-sm ${
                  msg.sender === "user"
                  ? (darkMode 
                    ? "bg-gradient-to-r from-violet-400 to-purple-400 text-white" 
                    : "bg-gradient-to-r from-blue-300 to-cyan-300 text-white")
                  : (darkMode 
                    ? "bg-gradient-to-r from-slate-800 to-slate-900 text-slate-200" 
                    : "bg-gradient-to-r from-slate-100 to-white text-slate-800")
                  }`}
                  style={{
                  borderRadius: msg.sender === 'user'
                  ? '0.7rem 0.7rem 0.25rem 0.7rem'
                  : '0.7rem 0.7rem 0.7rem 0.25rem'
                  }}
                >
                  <MarkDown message={msg.text} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {typing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className={`p-3 rounded-lg ${darkMode ? "bg-slate-700" : "bg-white"} text-sm text-slate-500 dark:text-slate-400 inline-flex items-center space-x-1 shadow-sm`}
               style={{ borderRadius: '1rem 1rem 1rem 0.25rem' }} 
              >
                <span className="typing-dot"></span>
                <span className="typing-dot animation-delay-200"></span>
                <span className="typing-dot animation-delay-400"></span>
              </div>
            </motion.div>
          )}
        </div>

        <div className={`p-4 border-t shrink-0 ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white/60 border-blue-100'}`}>
          <div className={`flex items-center space-x-2 rounded-full p-1 transition-colors ${darkMode ? 'bg-slate-700' : 'bg-white border border-slate-200'}`}>
            <input
              type="text"
              placeholder="Ask about the document..."
              className="flex-grow bg-transparent px-4 py-2 text-sm outline-none placeholder-slate-400 dark:placeholder-slate-500 disabled:opacity-50"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress} // *** ADDED THIS LINE ***
              disabled={typing || !docsId} // Disable if typing or no doc loaded
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || typing || !docsId} // Disable if no input, typing, or no doc
              title="Send Message"
              className={`p-2 rounded-full transition-all duration-200 text-white flex-shrink-0 ${!input.trim() || typing || !docsId
                  ? (darkMode ? 'bg-slate-600 cursor-not-allowed' : 'bg-slate-300 cursor-not-allowed')
                  : (darkMode ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90' : 'bg-gradient-to-r from-blue-600 torez-600 hover:opacity-90')
                }`}
            >
              <FiSend size={18} /> {/* Adjusted size slightly */}
            </button>
          </div>
        </div>
      </main>

      <style>{`
        .typing-dot {
          width: 6px;
          height: 6px;
          background-color: ${darkMode ? '#94a3b8' : '#64748b'}; /* slate-400 / slate-500 */
          border-radius: 50%;
          display: inline-block;
          animation: typing-bounce 1.2s infinite ease-in-out;
        }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }

        @keyframes typing-bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1.0); }
        }

        /* Custom scrollbar styling (optional, for webkit browsers) */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px; /* For horizontal scroll if needed */
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: ${darkMode ? 'rgba(100, 116, 139, 0.4)' : 'rgba(148, 163, 184, 0.5)'}; /* slate-500/400 with transparency */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
           background-color: ${darkMode ? 'rgba(100, 116, 139, 0.7)' : 'rgba(148, 163, 184, 0.8)'};
        }
        /* Ensure Markdown code blocks don't overflow weirdly (adjust as needed) */
        .prose pre {
          max-width: 100%;
          overflow-x: auto;
        }
      `}</style>
    </div>
  );
};

export default BookLibrary; // Keep original export name