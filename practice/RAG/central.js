import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { config } from "dotenv";
import {Index} from "@upstash/vector";
import { UpstashVectorStore } from "@langchain/community/vectorstores/upstash";
config()

//splitter
export const textSplitter = new RecursiveCharacterTextSplitter({
  // separators: ["16th at 1500"], //add curstom separators
  chunkSize: 700,
  chunkOverlap: 170,
});

//loader
export const loader = new PDFLoader("./public/drylab.pdf", {
  splitPages: false
});

//embedding
export const embeddings = new GoogleGenerativeAIEmbeddings({
  model: "text-embedding-004",
  taskType: TaskType.RETRIEVAL_DOCUMENT,
  title: "Document title",
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