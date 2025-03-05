// src/components/ChatBox.tsx

import { useEffect, useRef, useState } from "react";

// Defining the structure of a message
interface Message {
  id: number;
  text: string;
  sender: "user" | "bot"; // Identifies who sent the message
}

export default function ChatBox() {
  // State to store all messages
  const [messages, setMessages] = useState<Message[]>([]);
  // State to manage the current input value
  const [input, setInput] = useState("");


  const bottomRef = useRef<HTMLDivElement>(null);

  // 🔔 Added this effect to auto-scroll when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  
  // Function to handle sending a message
  const handleSend = () => {
    if (!input.trim()) return; // Prevent sending empty messages

    // Create the user's message object
    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: "user",
    };

    

    // Add user's message to the messages array
    setMessages((prev) => [...prev, userMessage]);
    setInput(""); // Clear the input field

    // Simulate a bot reply after a short delay
    setTimeout(() => {
      const botReply: Message = {
        id: Date.now() + 1,
        text: "This is a bot response!",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botReply]);
    }, 500); // Bot responds after 0.5 seconds
  };

  return (
    // Chatbox container with increased height and custom RGB border
    <div
      className="w-full min-w-2xl max-w-2xl mx-0 min-h-max bg-cyan-950 text-white p-0 rounded-xl shadow-md  relative"
      style={{
        // RGB gradient border on the top-left corner
        borderTopLeftRadius: "1rem",
        borderImage: "linear-gradient(135deg, #ff00ff, #00ffff, #ffcc00) 1",
        borderWidth: "3px",
        borderStyle: "solid",
        
        borderLeftColor: "transparent",
        borderTopColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "transparent",
        height: "max-content"
      }}
    >
      {/* Messages area */}
      <div
          className={`flex-grow overflow-x-auto space-y-4 mb-4 ${
          messages.length > 4 ? "overflow-y-auto" : ""
          }`}
          style={{
            maxHeight: messages.length > 4 ? "200px" : "auto",
          }}
>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-0 rounded-md ${
              msg.sender === "user"
                ? "bg-blue-600 text-right ml-auto" // User message styling
                : "bg-gray-700 text-left mr-auto" // Bot message styling
            } w-fit max-w-[80%]`}
          >
            {msg.text}
          </div>
        ))}
        {/* 🔔 Added this empty div at the end to scroll to */}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className="">
        {/* Input field with transparent background */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="min-w-[100vw] h-[20vh] px-4 py-2 rounded-l-md bg-transparent text-white outline-none placeholder-gray-400"
        />
        {/* Send button */}
        <button onClick={handleSend} className=" relative  top-0  translate-y-[-2vh] translate-x-146 px-4 py-2 bg-blue-600 text-white rounded-md h-[40px]">
          Send
        </button>
      </div>
    </div>
  );
}
