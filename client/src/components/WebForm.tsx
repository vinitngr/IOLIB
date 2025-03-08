import { axiosInstance } from '@/lib/axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function WebForm() {

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    webURL: '',
    title: '',
    description: '',
    language: '',
    category: '',
    embeddingModel: '',
    RAG: {
      retrieval: '',
      tokenPR: '',
      chunkOverlap: '',
      strict: false,
    }
  });

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | { target: { name: string; value: string | boolean } }) => {
    const { name, value } = e.target;
    if (name in formData.RAG) {
      setFormData({
        ...formData,
        RAG: { ...formData.RAG, [name]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/add/web', formData);
      console.log(res);
      navigate('/');
      console.log('Form submitted successfully:', formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form className="grid grid-cols-4 gap-2 min-w-full p-6 max-w-lg bg-white rounded-lg" onSubmit={handleSubmit}>
      <div className="form-group col-span-4 space-y-2">
        <label className="text-sm font-semibold col-span-4 text-gray-700">Website URL</label>
        <input
          type="url"
          name="webURL"
          placeholder="https://example.com"
          value={formData.webURL}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="form-group space-y-2 col-span-4">
        <label className="text-sm font-semibold text-gray-700 col-span-4">Title</label>
        <input
          type="text"
          name="title"
          placeholder="Enter title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="form-group space-y-2 col-span-4">
        <label className="text-sm font-semibold text-gray-700">Description</label>
        <textarea
          name="description"
          placeholder="Enter description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="form-group space-y-2 col-span-2">
        <label className="col-span-2 text-sm font-semibold text-gray-700">Language</label>
        <select
          name="language"
          value={formData.language}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Language</option>
          <option value="Hindi">Hindi</option>
          <option value="English">English</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="form-group col-span-2 space-y-2">
        <label className="text-sm font-semibold text-gray-700">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Category</option>
          <option value="News">News</option>
          <option value="Blog">Blog</option>
          <option value="E-commerce">E-commerce</option>
          <option value="Education">Education</option>
          <option value="Technology">Technology</option>
        </select>
      </div>

      <div className="form-group space-y-2 col-span-4">
        <label className="text-sm font-semibold text-gray-700">Embedding Model</label>
        <select
          name="embeddingModel"
          value={formData.embeddingModel}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Embedding Model</option>
          <option value="Default (Recommended)">Default (Recommended)</option>
          <option value="Advanced">Advanced</option>
          <option value="Legacy">Legacy</option>
        </select>
      </div>

      <div className="form-group space-y-2 col-span-4 grid grid-cols-2 gap-2">
        
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 col-span-1">Retrieval Count</label>
          <select
            name="retrieval"
            value={formData.RAG.retrieval}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Retrieval Count</option>
            <option value="1">1(fastest)</option>
            <option value="2">2(balanced)</option>
            <option value="3">3(accurate)</option>
          </select>
        </div>

        <div className="space-y-2 col-span-1">
          <label className="text-sm font-semibold text-gray-700">TokenPR</label>
          <input
            type="number"
            placeholder='between 500-2000'
            name="tokenPR"
            value={formData.RAG.tokenPR}
            onChange={handleChange}
            min={500}
            max={1500}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2 col-span-1">
          <label className="text-sm font-semibold text-gray-700">Chunk Overlap</label>
          <input
            type="number"
            name="chunkOverlap"
            placeholder='overlapping? 250 Recommended'
            value={formData.RAG.chunkOverlap}
            onChange={handleChange}
            min={10}
            max={300}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2 flex gap-2 col-span-1">
          <label className="text-sm font-semibold text-gray-700">Strict</label>
          <input
            type="checkbox"
            name="strict"
            checked={formData.RAG.strict}
            onChange={(e) => handleChange({ target: { name: 'strict', value: e.target.checked } })}
            className="h-5 w-5 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full col-span-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  );
}

export default WebForm;
