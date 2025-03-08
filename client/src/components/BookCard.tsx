// components/BookCard.tsx

// import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./ThemeProvider";
interface BookCardProps {
  title: string;
  author: string;
  image: string;
  details: string;
  category: string;
  language: string;
}

export default function BookCard({
  title,
  author,
  image,
  details,
  category,
  language,
}: BookCardProps) {
  const { darkMode } = useTheme();

  return (
    <div
      className={`bg-${darkMode ? "gray-900" : "white"} rounded-xl shadow-md p-0 grid grid-cols-3 gap-2 h-60`}
    >
      {/* Image taking full height and first column */}
      <img
        src={image}
        className="w-full h-60 object-cover rounded-l-md col-span-1"
      />

      {/* Content area across 2 columns */}
      <div className="col-span-2 flex flex-col">
        <h3 className="text-lg font-bold mt-6 mb-2">{title}</h3>
        <p className={`text-sm ${darkMode ? "text-gray-200" : "text-gray-600"} mb-2`}>
          By {author}
        </p>
        <p className={`text-sm ${darkMode ? "text-gray-200" : "text-gray-600"} mb-2`}>
          Category: {category}
        </p>
        <p className={`text-sm ${darkMode ? "text-gray-200" : "text-gray-600"} mb-2`}>
          Language: {language}
        </p>
        <p className={`t-sm ${darkMode ? "text-white" : "text-black"} overflow-clip max-h-30`}>
          {details}
        </p>

        {/* See Details Button */}
        <Link
          to="/testPage"
          className="mt-auto self-start px-4 py-2 mb-3 ml-1 relative bg-slate-300 text-blue-800 rounded-md text-sm hover:bg-blue-800 hover:text-slate-300 transition shadow-2xl hover:shadow-xl  "
        >
          See Details
        </Link>
      </div>
    </div>
  );
}

