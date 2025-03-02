export const formFields = [
  {
    type: "text",
    label: "Book Name",
    placeholder: "Enter book name",
    required: true,
    gridType: "single",
  },
  {
    type: "text",
    label: "Author Name",
    placeholder: "Enter Author name",
    gridType: "single",
  },
  {
    type: "number",
    label: "Token per splitting",
    placeholder: "eg: 250 / 2000",
    min: 250,
    max: 2000,
    gridType: "triple",
  },
  {
    type: "select",
    label: "Retrieval count",
    options: [
      { value: "light", label: "1 (fastest)" },
      { value: "dark", label: "2 (balanced)" },
      { value: "system", label: "3 (accurate)" },
    ],
    gridType: "triple",
  },
  {
    type: "number",
    label: "Skip Pages / Page Range",
    placeholder: "eg: 1-10 / 1-end",
    gridType: "triple",
  },
  {
    type: "file",
    label: "Book Cover Image",
    gridType: "single",
  },
  {
    type: "select",
    label: "Category",
    required: true,
    options: [
      { value: "Fiction", label: "Fiction" },
      { value: "Non-Fiction", label: "Non-Fiction" },
      { value: "Science", label: "Science" },
      { value: "Technology", label: "Technology" },
      { value: "History", label: "History" },
    ],
    gridType: "triple",
  },
  {
    type: "select",
    label: "Language",
    options: [
      { value: "English", label: "English" },
      { value: "Hindi", label: "Hindi" },
      { value: "French", label: "French" },
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
    placeholder: "Enter brief description about Website",
    gridType: "single",
  },
];