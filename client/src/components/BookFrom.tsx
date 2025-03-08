import { useState } from "react";
import { axiosInstance } from "@/lib/axios";

const UploadForm = () => {
  const [name, setName] = useState("");
  const [pdf, setPdf] = useState<File | null>(null);
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");
  // Initialize rag as an object with default values
  const [rag, setRag] = useState({
    chunkOverlap: 200,
    tokenPR:  700,
    retrival: 1,
    range: "1-end",
    strict: false,
  });
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    const ragString = JSON.stringify(rag);
  
    const formData = new FormData();
    formData.append("name", name);
    if (pdf) formData.append("pdf", pdf);
    formData.append("author", author);
    formData.append("category", category);
    formData.append("language", language);
    formData.append("description", description);
    formData.append("rag", ragString);
    if (image) formData.append("image", image);
  
    try {
      const response = await axiosInstance.post("/add/Upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Response:", response.data);
    } catch (err) {
      setError((err as Error).message || "Upload failed.");
      console.error("Error:", err);
    } finally {
      setLoading(false); 
    }
  };
  
  const updateRag = (key: string, value: string | number | boolean) => {
    setRag((prevRag) => ({
      ...prevRag,
      [key]: value,
    }));
  };
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-6">

        <div className="flex flex-col">
          <label htmlFor="name"  className="text-sm font-semibold text-gray-700">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter the name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="pdf"  className="text-sm font-semibold text-gray-700">Upload PDF</label>
          <input
            id="pdf"
            type="file"
            accept="application/pdf"
            onChange={(e) => e.target.files && setPdf(e.target.files[0])}
            required
            className="border border-gray-300 rounded-lg p-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="author"  className="text-sm font-semibold text-gray-700">Author</label>
          <input
            id="author"
            type="text"
            placeholder="Enter author name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            // required
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="category"  className="text-sm font-semibold text-gray-700">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select category</option>
            <option value="News">News</option>
            <option value="Blog">Blog</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Education">Education</option>
            <option value="Technology">Technology</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="language"  className="text-sm font-semibold text-gray-700">Language</label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            // required
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select language</option>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Chinese">Chinese</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="description"  className="text-sm font-semibold text-gray-700">Description</label>
          <textarea
            id="description"
            placeholder="Enter a brief description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <label className="flex items-center space-x-2">
          <span className="text-lg">Chunk Overlap</span>
          <input
            type="number"
            placeholder="Chunk Overlap"
            value={rag.chunkOverlap}
            onChange={(e) => updateRag("chunkOverlap", Number(e.target.value))}
            // required
            min={20}
            max={400}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="flex items-center space-x-2">
          <span  className="text-sm font-semibold text-gray-700">Token PR</span>
          <input
            type="number"
            placeholder="Token PR"
            value={rag.tokenPR}
            onChange={(e) => updateRag("tokenPR", Number(e.target.value))}
            // required
            min={250}
            max={1500}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="flex items-center space-x-2">
          <span  className="text-sm font-semibold text-gray-700">Retrival</span>
          <select
            value={rag.retrival}
            onChange={(e) => updateRag("retrival", Number(e.target.value))}
            // required
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </label>

        <label className="flex items-center space-x-2">
          <span  className="text-sm font-semibold text-gray-700"  >Range</span>
          <input
            type="text"
            placeholder="Range"
            value={rag.range}
            onChange={(e) => updateRag("range", e.target.value)}
            // required
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={rag.strict}
            onChange={(e) => updateRag("strict", e.target.checked)}
            className="form-checkbox h-5 w-5 text-blue-500"
          />
          <span  className="text-sm font-semibold text-gray-700">RAG Strict</span>
        </label>


        <div className="flex flex-col">
          <label htmlFor="image"  className="text-sm font-semibold text-gray-700">Upload Image</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files && setImage(e.target.files[0])}
            // required
            className="border border-gray-300 rounded-lg p-2"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg focus:outline-none hover:bg-blue-600 disabled:bg-gray-300"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </form>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>

  );
};

export default UploadForm;