/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useBookStore } from "@/stores/homeStore";
import { BookHome } from "@/types/types";
import { Link } from "react-router-dom";

const CustomCard = ({
  type,
  author,
  title,
  // language,
  description,
  image,
  docsId,
  category
}: {
  title: string,
  type: string;
  author: string;
  category: string;
  language: string;
  description: string;
  image: string;
  docsId: string
}) => {


  const colors = [
    "#FF9900",
    "#109618",
  "#0074D9",
    "#FF851B",
    'black'
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div
      className="h-56 border bg-white rounded-lg grid  grid-cols-5 shadow-md p-2 "
    >
      { type == 'pdf'  ?
        <img
        src={image}
        alt="Book cover"
        className=" h-full overflow-hidden border mr-2 object-cover rounded-md col-span-2"
      /> : <div 
      style={{ backgroundColor: randomColor }}
      className={`h-full overflow-hidden bg-gray-500 mr-2 object-cover col-span-2 rounded-md border text-white p-2`}><span className="block text-3xl font-bold">web</span>{description}</div>
      }
      <div className="col-span-3 flex flex-col justify-between">
        <div className="ml-2">
          <h3 className="text-sm font-semibold line-clamp-4">title: {title}</h3>
          <p className="text-xs text-gray-600">author: {author}</p>
          <p className="text-sm text-gray-600">Category: {category}</p>
          {/* <p className="text-xs text-gray-600">Language: {language}</p> */}
          <p className="text-xs text-gray-700 mt-2 line-clamp-3">Description: {description}</p>
        </div>
          <Link to={`/chat/${docsId}`} className="bg-gray-500 ml-2 cursor-pointer flex justify-center items-center text-white rounded-lg px-3">Have Chat</Link>
      </div>
    </div>
  );
};

function Home() {
  const { allBooks, fetchBooks } = useBookStore();
  //filter constant
  const [filter, setFilter] = useState({ type: '', category: '', language: '', author: '' });

  //handleFilterChagne
  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };

  //main functionality of filtering 
  const filteredBooks = allBooks.filter((book: BookHome) => {
    const bookDetails: any = book.type === 'pdf' ? book.aboutPdf : book.aboutWeb;
    return (
      (filter.type ? book.type === filter.type : true) &&
      (filter.category ? bookDetails.category.toLowerCase().includes(filter.category.toLowerCase()) : true) &&
      (filter.language ? bookDetails.language.toLowerCase().includes(filter.language.toLowerCase()) : true) &&
      (filter.author ? bookDetails.author.toLowerCase().includes(filter.author.toLowerCase()) : true)
    );
  });


  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);
console.log(allBooks);
  return (
    <div className="grid min-h-max bg-slate-100">
    <div className="flex-1 flex flex-col ml-16">
      <div className="mt-0 p-0">
        {/* Filter Bar */}
        <div className="flex gap-4 fixed w-full bg-white  top-0 h-20">
          <select name="type" value={filter.type} onChange={handleFilterChange} className="border ml-10 p-2 h-10 self-center rounded">
            <option value="">All Types</option>
            <option value="pdf">PDF</option>
            <option value="web">Web</option>
          </select>

          <select name="category" value={filter.category} onChange={handleFilterChange} className="border p-2 h-10 self-center rounded">
              <option value="">All Categories</option>
              {Array.from(new Set(allBooks.map((book: BookHome) => book.type === 'pdf' ? book.aboutPdf!.category : book.aboutWeb!.category)))
                .filter(Boolean)
                .map((category) => (
                  <option key={category} value={category}>{category}</option>
              ))}
            </select>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-50 mt-30 gap-3">
          {filteredBooks.reverse().map((book: BookHome) => {
            const bookDetails: any = book.type === 'pdf' ? book.aboutPdf : book.aboutWeb;
            return (
              <CustomCard
                title={bookDetails.title || 'not set'}
                key={book._id}
                type={book.type}
                author={bookDetails?.author || "Unknown Author"}
                category={bookDetails?.category || "General"}
                language={bookDetails?.language || "Not specified"}
                description={bookDetails?.description || "No description available"}
                image={bookDetails?.url || "default-image-url"}
                docsId={book.docsId}
              />
            );
          })}
        </div>
      </div>
    </div>
  </div>
);

}

export default Home;
