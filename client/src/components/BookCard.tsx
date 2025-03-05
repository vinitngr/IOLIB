// components/BookCard.tsx
interface BookCardProps {
  title: string;
  author: string;
  image: string;
  details : string;
}

export default function BookCard({ title, author, image , details="Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium iusto cumque quaerat! Eius delectus sint iste hic, minus alias veniam velit adipisci eum dolores consequatur necessitatibus optio voluptatum consequuntur doloremque?" }: BookCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 grid grid-cols-3 gap-2 h-60">

  {/* Image taking full height and first column */}
  <img
    src={image}
    alt={title}
    className="w-full h-52 object-cover rounded-md col-span-1"
  />

  {/* Content area across 2 columns */}
  <div className="col-span-2 flex flex-col">
    <h3 className="text-lg font-bold">{title}</h3>
    <p className="text-sm text-gray-600 mb-2">{author}</p>
    <p className="text-sm text-black overflow-clip max-h-30">
      {details}
    </p>
  </div>

</div>
  );
}
