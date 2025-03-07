  import { useEffect } from "react";
  // import BookControls from "@/components/ui/BookControls";
  import { useBookStore } from "@/stores/homeStore";
import BookCard from "@/components/BookCard";
import { BookHome } from "@/types/types";
  function Home() {

    // const [searchQuery, setSearchQuery] = useState("");
    // const [sortOption, setSortOption] = useState("title");
    // const [filterAuthor, setFilterAuthor] = useState("");
    // const [filterCategory, setFilterCategory] = useState("");
    // const [filterLanguage, setFilterLanguage] = useState("");

    const { allBooks , fetchBooks } = useBookStore();

    useEffect(() => {
      fetchBooks();
    }, [fetchBooks]);

    // const languages = Array.from(new Set(booksData.map((book) => book.language)));
    // const authors = Array.from(new Set(booksData.map((book) => book.author)));
    // const categories = Array.from(new Set(booksData.map((book) => book.category)));

    // const filteredBooks = booksData
    //   .filter(
    //     (book) =>
    //       book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //       book.author.toLowerCase().includes(searchQuery.toLowerCase())
    //   )
    //   .filter((book) =>
    //     filterAuthor ? book.author === filterAuthor : true
    //   )
    //   .filter((book) =>
    //     filterCategory ? book.category === filterCategory : true
    //   )
    //   .filter((book) =>
    //     filterLanguage ? book.language === filterLanguage : true
    //   )
    //   .sort((a, b) => {
    //     if (sortOption === "title") return a.title.localeCompare(b.title);
    //     if (sortOption === "author") return a.author.localeCompare(b.author);
    //     return 0;
    //   });
    
    return (
      <div className="grid min-h-max bg-slate-200">
        
      <div className="flex-1 flex flex-col ml-16">
        
        {/* <div className="fixed top-0 left-16 right-0 z-10 shadow-md ">
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
            filterLanguage={filterLanguage}
            setFilterLanguage={setFilterLanguage}
            languages={languages}
          />
        </div> */}
        <div className="mt-24 p-4">
        <div>
        <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4 overflow-y-auto col-span-3 gap-10 px-50 py-15">
          {[...allBooks].reverse().map((book: BookHome, index: number) => { // Make sure index is typed correctly as `number`
            const isPdf = book.type === "pdf";
            const bookDetails = isPdf ? book.aboutPdf : book.aboutWeb;

            return (
              <BookCard
                key={index} // Using `index` as a unique key, which is a valid approach here
                author={bookDetails?.author || "Unknown Author"}
                image={bookDetails?.url || "default-image-url"} // Use default image if URL is missing
                details={bookDetails?.description || "No description available"}
                category={bookDetails?.category || "General"}
                language={bookDetails?.language || "Not specified"}
              />
            );
          })}
      </div>
      </div>
        </div>

      </div>
    </div>
        
        
    );
  }

  export default Home