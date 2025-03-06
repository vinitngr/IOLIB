// import BookFrom from "@/components/BookFrom.tsx"
import BookGrid from "@/components/BookGrid.tsx";
// import ChatBox from "@/components/ChatBox";

import booksData from "@/data/books.json";
import NavBar from "@/components/NavBarSideways.tsx";
import { useState } from "react";
import BookControls from "@/components/ui/BookControls";
// import BgColor from "@/components/ui/bgHome.tsx"
function Home() {
  // const [bgColor, setBgColor] = useState("white");



  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("title");
  const [filterAuthor, setFilterAuthor] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const authors = Array.from(new Set(booksData.map((book) => book.author)));
  const categories = Array.from(new Set(booksData.map((book) => book.category)));

  const filteredBooks = booksData
    .filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((book) =>
      filterAuthor ? book.author === filterAuthor : true
    )
    .filter((book) =>
      filterCategory ? book.category === filterCategory : true
    )
    .sort((a, b) => {
      if (sortOption === "title") return a.title.localeCompare(b.title);
      if (sortOption === "author") return a.author.localeCompare(b.author);
      return 0;
    });
  
  
  return (
    <div className="grid min-h-max bg-slate-200">
      
    {/* Sidebar */}
    <NavBar />

    {/* Main content */}
    <div className="flex-1 flex flex-col ml-16">
      
      {/* Fixed Controls */}
      <div className="fixed top-0 left-16 right-0 z-10 shadow-md ">
        <BookControls
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortOption={sortOption}
          setSortOption={setSortOption}
          filterAuthor={filterAuthor}
          setFilterAuthor={setFilterAuthor}
          authors={authors}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          categories={categories}
        />
      </div>

      {/* Scrollable Book Grid */}
      <div className="mt-24 p-4">
        <BookGrid books={filteredBooks} />
      </div>

    </div>
  </div>
      
      
  );
}

export default Home