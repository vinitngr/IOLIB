// import { useEffect, useState } from "react";
// // import BookGrid from "@/components/BookGrid";
// import booksData from "@/data/books.json";
// import { useTheme } from "@/components/ThemeProvider";

// export default function BooksPage() {
//   const [geminiApiKey, setGeminiApiKey] = useState("");
//   const [upstashApiKey, setUpstashApiKey] = useState("");
//   const books = booksData;

//   const handleSaveKeys = () => {
//     localStorage.setItem("geminiApiKey", geminiApiKey);
//     localStorage.setItem("upstashApiKey", upstashApiKey);
//     alert("API Keys saved to local storage!");
//   };

//   const {darkMode} = useTheme();
  
  
//   return (
//     // ✨ CHANGED: Removed min-h-screen, added w-full to cover width, and bg-slate-100 stays as is
//     <div className={`flex w-full ${ darkMode ? "bg-gray-800" : "bg-slate-200"}`}>

//       {/* Sidebar for API Keys */}
//       {/* ✨ CHANGED: Adjusted width to w-1/4 and added m-4 for gap */}
//       <div className={`w-220 ${darkMode ? "bg-gray-900" : "bg-white"}  p-6 rounded-lg shadow-md m-4`}>
//         <h2 className="text-lg font-bold mb-4">ADD API KEYS</h2>

//         <div className="mb-4">
//           <label className="block text-sm">GEMINI API KEY</label>
//           <input
//             type="text"
//             value={geminiApiKey}
//             onChange={(e) => setGeminiApiKey(e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm">UPSTASH API KEY</label>
//           <input
//             type="text"
//             value={upstashApiKey}
//             onChange={(e) => setUpstashApiKey(e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md"
//           />
//         </div>

//         <button
//           onClick={handleSaveKeys}
//           className="w-full bg-blue-500 text-white py-2 rounded-md"
//         >
//           ADD TO LOCAL STORAGE
//         </button>
//       </div>

//       {/* Main content for books */}
//       <div className="flex-grow  overflow-y-auto p-6">
//         <div className="flex fixed items-center mb-4">
//           <h2 className="text-2xl font-bold">YOUR BOOKS</h2>
//           <button className="bg-blue-500 fixed right-10 text-white px-4 py-2 rounded-md">
//             ADD BOOKS
//           </button>
//         </div>

//         <BookGrid books={books} columns={2} />
//       </div>

//     </div>
//   );
// }
