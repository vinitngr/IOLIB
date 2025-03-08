/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useBookStore } from "@/stores/homeStore";
import { BookHome } from "@/types/types";
import { Link } from "react-router-dom";

const CustomCard = ({
  type,
  author,
  category,
  language,
  description,
  image,
  docsId
}: {
  type: string;
  author: string;
  category: string;
  language: string;
  description: string;
  image: string;
  docsId: string
}) => {


  // const colors = [
  //   "#FF9900",
  //   "#109618",
  //   "#0074D9",
  //   "#FF851B",
  //   'black'
  // ];
  // const randomColor = colors[Math.floor(Math.random() * colors.length)];

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
      // style={{ backgroundColor: randomColor }}
      className={`h-full overflow-hidden bg-gray-500 mr-2 object-cover col-span-2 rounded-md border text-white p-2`}><span className="block text-3xl font-bold">web</span>{description}</div>
      }
      <div className="col-span-3 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold">Author: {author}</h3>
          <p className="text-sm text-gray-600">Category: {category}</p>
          <p className="text-sm text-gray-600">Language: {language}</p>
          <p className="text-sm text-gray-700 mt-2">Description: {description}</p>
        </div>
          <Link to={`/chat/${docsId}`} className="bg-gray-500 cursor-pointer flex justify-center items-center text-white rounded-lg px-3">Have Chat</Link>
      </div>
    </div>
  );
};

function Home() {
  const { allBooks, fetchBooks } = useBookStore();
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);
console.log(allBooks);
  return (
    <div className="grid min-h-max bg-slate-100">
      <div className="flex-1 flex flex-col ml-16">
        <div className="mt-5 p-4">
          <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4 overflow-y-auto col-span-3 gap-3 px-50 py-15">
            {[...allBooks].reverse().map((book: BookHome) => {
              const isPdf = book.type === "pdf";
              const bookDetails : any = isPdf ? book.aboutPdf : book.aboutWeb;
              return (
                <CustomCard
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
