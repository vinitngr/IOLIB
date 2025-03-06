// components/BookCard.tsx

import { Link } from "react-router-dom";
interface BookCardProps {
  title: string;
  author: string;
  image: string;
  details : string;
  category : string;
  language : string;
}

export default function BookCard({ title, author, image , details="Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium iusto cumque quaerat! Eius delectus sint iste hic, minus alias veniam velit adipisci eum dolores consequatur necessitatibus optio voluptatum consequuntur doloremque?", category, language="English"}: BookCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-0 grid grid-cols-3 gap-2 h-60">

  {/* Image taking full height and first column */}
  <img
    src={image}
    alt={title}
    className="w-full h-60 object-cover rounded-l-md col-span-1"
  />

  {/* Content area across 2 columns */}
  <div className="col-span-2 flex flex-col">
    <h3 className="text-lg font-bold mt-6 mb-2">{title}</h3>
    <p className="text-sm text-gray-600 mb-2">{author}</p>
    <p className="text-sm text-black overflow-clip max-h-30">
      {details}
    </p>
    
     {/* See Details Button */}
     <Link to="/testPage"
          className="mt-auto self-start px-4 py-2 mb-3 ml-1 relative bg-slate-300 text-blue-800 rounded-md text-sm hover:bg-blue-800 hover:text-slate-300 transition shadow-2xl hover:shadow-xl  "
          
        >
          See Details
      </Link>
  </div>
 

</div>
  );
}
