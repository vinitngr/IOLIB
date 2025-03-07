import {z} from 'zod'
import { DEFAULT_CHUNK_OVERLAP, DEFAULT_CHUNK_SIZE, DEFAULT_RANGE, DEFAULT_RETRIVAL } from '../configs/Constant';
export const pdfSchema = z.object({
    author: z.string().optional(),
    category: z.string().optional(),
    language: z.string().optional(),
    description: z.string().optional(),
    rag: z.string().optional(),
});
export const ragSchema = z.object({
    retrival: z.number().min(0).default(DEFAULT_RETRIVAL),
    tokenPR: z.number().min(0).default(DEFAULT_CHUNK_SIZE),
    chunkOverlap: z.number().min(0).default(DEFAULT_CHUNK_OVERLAP),
    strict: z.boolean().default(false),
    range: z.string().regex(/^1-(\d+|end)$/).default(DEFAULT_RANGE),
  });
  
export const webSchema = z.object({
    webURL: z.string().url({ message: "Invalid URL format" }),
    title: z.string().optional(),
    description: z.string().optional(),
    language: z.string().optional(),
    category: z.string().optional(),
    RAG: z.object({
        retrival: z.number().min(1).optional(),
        tokenPR: z.number().min(1).optional(),
        chunkOverlap: z.number().min(0).optional(),
        strict: z.boolean().optional(),
    }).optional(),
});