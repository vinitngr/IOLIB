/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useBookStore } from "@/stores/homeStore";
import { BookHome } from "@/types/types";

const CustomCard = ({
  author,
  category,
  language,
  description,
  image,
}: {
  author: string;
  category: string;
  language: string;
  description: string;
  image: string;
}) => {
  return (
    <div className="bg-white h-56 rounded-lg shadow-md p-2 flex ">
      <img
        src={image}
        alt="Book cover"
        className=" h-full overflow-hidden mr-2 object-cover rounded-md"
      />
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Author: {author}</h3>
        <p className="text-sm text-gray-600">Category: {category}</p>
        <p className="text-sm text-gray-600">Language: {language}</p>
        <p className="text-sm text-gray-700 mt-2">Description: {description}</p>
      </div>
    </div>
  );
};

function Home() {
  const { allBooks, fetchBooks } = useBookStore();
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <div className="grid min-h-max bg-slate-200">
      <div className="flex-1 flex flex-col ml-16">
        <div className="mt-24 p-4">
          <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4 overflow-y-auto col-span-3 gap-10 px-50 py-15">
            {[...allBooks].reverse().map((book: BookHome) => {
              const isPdf = book.type === "pdf";
              const bookDetails : any = isPdf ? book.aboutPdf : book.aboutWeb;


              return (
                <CustomCard
                  key={book._id} 
                  author={bookDetails?.author || "Unknown Author"}
                  category={bookDetails?.category || "General"}
                  language={bookDetails?.language || "Not specified"}
                  description={bookDetails?.description || "No description available"}
                  image={bookDetails?.url || "default-image-url"}
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
