// import BookFrom from "@/components/BookFrom.tsx"
import BookGrid from "@/components/BookGrid.tsx";
// import ChatBox from "@/components/ChatBox";

import booksData from "@/data/books.json";
import NavBar from "@/components/NavBar.tsx"  
// import BgColor from "@/components/ui/bgHome.tsx"
function Home() {
  // const [bgColor, setBgColor] = useState("white");


  const books = booksData;
  
  
  return (
    <div className="bg-slate-200 bg-gradient-to-bl min-w-full min-h-max">
      
      <NavBar/>
      <BookGrid books={books} />



      {/* <div className="mono2"><center>Home</center></div>
      <div className="fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
        <span className=" items-center justify-center">
          <ChatBox/>
        </span>

      </div> */}
      {/* <div className="col-span-3 grid grid-cols-3 gap-20 px-50 py-30">
      <BookCard  title={"The Great Gatsby"} author={"F. Scott Fitzgerald"} image={"https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?fit=crop&w=400&h=200&q=80"} />
      </div> */}
      

    </div>
  )
}

export default Home