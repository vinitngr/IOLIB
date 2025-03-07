import { BookControlsProps } from "@/types/types";

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
  filterLanguage,
  setFilterLanguage,
  languages,
}: BookControlsProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md">
      <input
        type="text"
        placeholder="Search books..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border rounded px-3 py-2"
      />

      <select
        value={filterAuthor}
        onChange={(e) => setFilterAuthor(e.target.value)}
        className="border rounded px-3 py-2"
      >
        <option value="">All Authors</option>
        {authors.map((author, index) => (
          <option key={index} value={author}>
            {author}
          </option>
        ))}
      </select>

      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
        className="border rounded px-3 py-2"
      >
        <option value="">All Categories</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        value={filterLanguage}
        onChange={(e) => setFilterLanguage(e.target.value)}
        className="border rounded px-3 py-2"
      >
        <option value="">All Languages</option>
        {languages.map((language, index) => (
          <option key={index} value={language}>
            {language}
          </option>
        ))}
      </select>

      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="border rounded px-3 py-2"
      >
        <option value="title">Sort by Title</option>
        <option value="author">Sort by Author</option>
      </select>
    </div>
  );
}
