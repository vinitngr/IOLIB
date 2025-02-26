import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { config } from "dotenv";
import {Index} from "@upstash/vector";
import { UpstashVectorStore } from "@langchain/community/vectorstores/upstash";
config()

//splitter
export const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 700,
  chunkOverlap: 170,
  // separators: [". "], 
});

//loader 
export const loader = new PDFLoader("./practice-js/public/test.pdf", {
  splitPages: false
});

//embedding
export const embeddings = new GoogleGenerativeAIEmbeddings({
  model: "text-embedding-004",
  taskType: TaskType.RETRIEVAL_DOCUMENT,
  title: "Document title",
});


export const llm = new ChatGoogleGenerativeAI({
  model : "gemini-2.0-flash",
  temperature: 0,
  maxOutputTokens: 300,
});


//vector Store
export const indexWithCredentials = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN,
});

//create vector store instance
export const vectorStore = new UpstashVectorStore(embeddings, {
  index: indexWithCredentials,
});


