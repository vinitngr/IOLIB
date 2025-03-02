export const formFields2 = [
    {
      type: "text",
      label: "Website Name",
      placeholder: "Enter website name",
      required: true,
      gridType: "single",
    },
    {
      type: "url",
      label: "Website URL",
      placeholder: "https://example.com",
      required: true,
      gridType: "single",
    }
    ,
    {
      type: "text",
      label: "Author name",
      placeholder: "Blog auther",
      gridType: "double",
    },
    {
      type: "number",
      label: "Embedding Token Length",
      placeholder: "embedding token Length",
      gridType: "triple",
    },
    {
      type: "select",
      label: "Retrieval Count",
      options: [
        { value: "2", label: "2 (Balanced)" },
        { value: "1", label: "1 (Minimal)" },
        { value: "3", label: "3 (Comprehensive)" },
        { value: "4", label: "4 (Extensive)" },
      ],
      gridType: "triple",
    },
    {
      type: "select",
      label: "Category",
      required: true,
      options: [
        { value: "News", label: "News" },
        { value: "Blog", label: "Blog" },
        { value: "E-commerce", label: "E-commerce" },
        { value: "Education", label: "Education" },
        { value: "Technology", label: "Technology" },
      ],
      gridType: "triple",
    },
    {
      type: "select",
      label: "Embedding Model",
      options: [
        { value: "Default (Recommended)", label: "Default (Recommended)" },
        { value: "Advanced", label: "Advanced" },
        { value: "Legacy", label: "Legacy" },
      ],
      gridType: "triple",
    },
    {
      type: "textarea",
      label: "Description",
      placeholder: "Enter brief description about site",
      gridType: "single",
    }
  ];