// components/BookGrid.tsx
import BookCard from "@/components/BookCard.tsx";
// import { useState } from "react";
// import BookControls from "@/components/ui/BookControls.tsx";


interface Book {
  title: string;
  author: string;
  image: string;
  details: string;
  category: string;
  language : string;
}

interface BookGridProps {
  books: Book[];
  columns?: number; // Optional prop with default value
}
export default function BookGrid({ books, columns = 3 }: BookGridProps) {

  const columnClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-4",
  }[columns] || "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"; // Fallback to 3 columns



  return (
    <div>  
      {/* Dynamic 3-column grid */}
      <div className={`flex-grow grid  ${columnClasses} p-4 overflow-y-auto
      col-span-3 gap-10   px-50 py-30`}>
        {books.map((book, index) => (
          <BookCard
            key={index}
            title={book.title}
            author={book.author}
            image={book.image}
            details={book.details}
            category={book.category}
            language={book.language}
          />
        ))}
      </div>
    </div>
  );
}


