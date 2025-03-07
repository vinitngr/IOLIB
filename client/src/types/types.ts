
interface AuthUser {
    _id: string;
    fullName: string;
    email: string;
    profilepic: string;
    createdAt: Date;
    role: string;
    profession: string
}

export interface AuthStore {
    authUser: AuthUser | null;
    checkAuth: () => Promise<void>;
    handleLogin: (formData: { email: string; password: string }) => Promise<void>;
    handleRegister: (formData: { email: string; fullName: string; password: string }) => Promise<void>;
    handleLogout: () => Promise<void>;
}

export interface BookControlsProps {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    sortOption: string;
    setSortOption: (value: string) => void;
    filterAuthor: string;
    setFilterAuthor: (value: string) => void;
    authors: string[];
    filterCategory: string;
    setFilterCategory: (value: string) => void;
    categories: string[];
    filterLanguage: string;
    setFilterLanguage: (value: string) => void;
    languages: string[];
  }

export interface Message {
sender: "user" | "ai"; 
text: string;
}

export interface AboutPdf {
    author: string;
    category: string;
    language: string;
    description: string;
    url: string;
  }
  
  export interface AboutWeb {
    webURL: string;
    title: string;
    category: string;
    language: string;
    description: string;
  }
  
  export interface Book {
    aboutPdf?: AboutPdf;
    aboutWeb?: AboutWeb;
    _id: string;
    type: 'pdf' | 'web';
    docsId: string;
    createdAt: string;
    __v: number;
  }
  
  export interface BookStore {
    allBooks: BookHome[];
    fetchBooks: () => Promise<void>;
  }


 export  interface BookCardProps {
    title: string;
    author: string;
    image: string;
    details: string;
    category: string;
    language: string;
  }
  




  export interface BookHome {
    _id: string;
    type: 'pdf' | 'web';
    docsId: string;
    createdAt: string;
    __v: number;
    aboutPdf?: {
      author: string;
      category: string;
      language: string;
      description: string;
      url: string;
    };
    aboutWeb?: {
      webURL: string;
      title: string;
      category: string;
      language: string;
      description: string;
    };
    RAG?: {
      retrival: number;
      tokenPR: number;
      chunkOverlap: number;
      strict: boolean;
    };
  }
  
  