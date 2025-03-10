// // components/BookGrid.tsx
// import BookCard from "@/components/BookCard.tsx";

// interface Book {
//   title: string;
//   author: string;
//   image: string;
//   details: string;
// }

// export default function BookGrid({ books }: { books: Book[] }) {
//   return (
//     <div>
      

//       {/* Dynamic 3-column grid */}
//       <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4 overflow-y-auto
//       col-span-3 gap-20 px-50 py-30">
//         {books.map((book, index) => (
//           <BookCard
//             key={index}
//             title={book.title}
//             author={book.author}
//             image={book.image}
//             details={book.details}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// {/* <div className="mono2"><center>Home</center></div>
//       <div className="fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
//         <span className=" items-center justify-center">
//           <ChatBox/>
//         </span>
      
//       </div> */}
//       {/* <div className="col-span-3 grid grid-cols-3 gap-20 px-50 py-30">
//       <BookCard  title={"The Great Gatsby"} author={"F. Scott Fitzgerald"} image={"https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?fit=crop&w=400&h=200&q=80"} />
//       </div> */}

// {/*home backup*/}
// <div className="bg-slate-200 bg-gradient-to-bl min-w-full min-h-max ">
      
//       <NavBar/>
//       <BookGrid books={books} />



//       {/* <div className="mono2"><center>Home</center></div>
//       <div className="fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
//         <span className=" items-center justify-center">
//           <ChatBox/>
//         </span>

//       </div> */}
//       {/* <div className="col-span-3 grid grid-cols-3 gap-20 px-50 py-30">
//       <BookCard  title={"The Great Gatsby"} author={"F. Scott Fitzgerald"} image={"https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?fit=crop&w=400&h=200&q=80"} />
//       </div> */}
      

//     </div>
