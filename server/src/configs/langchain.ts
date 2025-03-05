import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { config } from "dotenv";
import { Index } from "@upstash/vector";
import { UpstashVectorStore } from "@langchain/community/vectorstores/upstash";
import { DEFAULT_MODEL, DEFAULT_OUTPUT_TOKEN, DEFAULT_TEMP, DEFAULT_CHUNK_SIZE, DEFAULT_CHUNK_OVERLAP } from "./Constant";
import { Embeddings } from "@langchain/core/embeddings";

config();

export const llm = (model = DEFAULT_MODEL, temperature = DEFAULT_TEMP, maxOutputTokens = DEFAULT_OUTPUT_TOKEN) =>
    new ChatGoogleGenerativeAI({ model, temperature, maxOutputTokens });

export const createTextSplitter = (chunkSize : number , chunkOverlap : number) =>
    new RecursiveCharacterTextSplitter({ chunkSize, chunkOverlap });

export const createLoader = (filePath: string, splitPages = false) =>
    new PDFLoader(filePath, { splitPages });

export const createEmbeddings = (title = "Document title") =>
    new GoogleGenerativeAIEmbeddings({ 
        model: "text-embedding-004", 
        taskType: TaskType.RETRIEVAL_DOCUMENT, 
        title 
    });

export const indexWithCredentials = new Index({
    url: process.env.UPSTASH_VECTOR_REST_URL,
    token: process.env.UPSTASH_VECTOR_REST_TOKEN,
    });
      
export const createVectorStore = (embeddings : Embeddings) =>
    new UpstashVectorStore(embeddings, {
        index: indexWithCredentials,
    });
