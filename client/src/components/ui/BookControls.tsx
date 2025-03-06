// components/BookControls.tsx

interface BookControlsProps {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    sortOption: string;
    setSortOption: (value: string) => void;
    filterAuthor: string;
    setFilterAuthor: (value: string) => void;
    authors: string[];
    filterCategory: string;
    setFilterCategory: (value: string) => void;
    categories : string[];
  }
  
  export default function BookControls({
    searchQuery,
    setSearchQuery,
    sortOption,
    setSortOption,
    filterAuthor,
    setFilterAuthor,
    authors,
    filterCategory,
    setFilterCategory,
    categories,
  }: BookControlsProps) {
    return (
      <div className="flex min-w-full justify-end min-h-30 items-center gap-30 bg-white/90 p-4 shadow-xl">
  
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
  
        {/* Filter by Author */}
        <select
          value={filterAuthor}
          onChange={(e) => setFilterAuthor(e.target.value)}
          className="px-4 py-2 underline underline-offset-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Authors</option>
          {authors.map((author, index) => (
            <option key={index} value={author}>{author}</option>
          ))}
        </select>

        {/* Filter by Author */}
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 underline underline-offset-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
  
        {/* Sort */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="px-4 py-2 underline underline-offset-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="title">Sort by Title</option>
          <option value="author">Sort by Author</option>
        </select>
        
      </div>
    );
  }
  