import React, { useState, useRef, useEffect } from 'react';
import { Send, Plus, MessageSquare } from 'lucide-react';

const AiChat = () => {
  const [messages, setMessages] = useState<Array<{
    id: string;
    content: string;
    sender: 'user' | 'ai';
    timestamp: Date;
  }>>([
    
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    const newUserMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user' as const,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        content: "This is a simulated response from Claude. In a real implementation, this would be replaced with an actual API lorem*10 call to an AI service.",
        sender: 'ai' as const,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f9fafb] font-sans">
      {/* Header */}
      <header className="py-3 px-6 border-b border-[#e5e7eb] bg-white flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-3">
              <span className='text-white'>IO</span>
            </div>
          <h1 className="text-lg font-medium text-[#1f2937]">IOlib</h1>
        </div>
      </header>
      
     
      
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 pt-2 space-y-6 max-w-3xl mx-auto w-[700px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
          >
            <div className={`relative  flex max-w-2xl rounded-2xl py-1 px-6 ${
              message.sender === 'user' 
                ? 'bg-[#303030] text-white text-right' 
                : 'bg-white shadow-md border border-[#e5e7eb] text-left py-3'
            }`}>
              {message.sender === 'ai' && (
                <div className="absolute -left-2 -top-2 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>  
              )}
              
              <div className={`text-sm mb-1 font-medium ${message.sender === 'user' ? 'text-[#e0e7ff]' : 'text-[#4f46e5]'}`}>
              </div>
              <div className={`whitespace-pre-wrap text-[15px] leading-relaxed ${message.sender === 'user' ? 'text-white' : 'text-[#1f2937]'}`}>
                {message.content}
              </div>
            
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start animate-fadeIn">
            <div className="relative max-w-2xl rounded-2xl p-2 px-6 bg-white shadow-md border border-[#e5e7eb]">
              <div className="absolute -left-2 -top-2 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <div className="text-sm mb-1 font-medium ">IOlib</div>
             
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="sticky bottom-0 bg-[#f9fafb] border-t border-[#e5e7eb] pt-4 pb-6 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-end rounded-xl border border-[#d1d5db] bg-white shadow-sm focus-within:ring-2  transition-all duration-200">
            <button className="p-3 text-[#6b7280] transition-colors">
              <Plus className="w-5 h-5" />
            </button>
            
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Message iolib..."
              className="flex-1 py-3 px-2 resize-none outline-none rounded-xl text-[#1f2937] text-[15px] placeholder-[#9ca3af] min-h-[44px] max-h-[180px]"
              rows={1}
            />
            
            <button 
              onClick={handleSendMessage}
              disabled={inputValue.trim() === ''}
              className={`p-3 rounded-r-xl transition-colors`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          

        </div>
      </div>
    </div>
  );
};

export default AiChat;