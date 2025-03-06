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
}

export default function BookGrid({ books }: { books: Book[] }) {


  return (
    <div>  
      {/* Dynamic 3-column grid */}
      <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4 overflow-y-auto
      col-span-3 gap-10   px-50 py-30">
        {books.map((book, index) => (
          <BookCard
            key={index}
            title={book.title}
            author={book.author}
            image={book.image}
            details={book.details}
            category={book.category}
          />
        ))}
      </div>
    </div>
  );
}


