import { axiosInstance } from '@/lib/axios';
import {create} from 'zustand';
import { BookStore } from '@/types/types';


export const useBookStore = create<BookStore>((set) => ({
  allBooks: [],
  fetchBooks: async () => {
    try {
      const response = await axiosInstance.get('/get/docs');      
      const data = await response.data;
      set({ allBooks: data.docs });
    } catch (error) {
      console.error('Error fetching books:', error);
      set({ allBooks: [] });
    }
  },
}));
