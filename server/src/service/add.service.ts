import {  DocsData, RAGconfig, WebData } from "../types/web.type"
import { tvly } from "../configs/tavily"
import { createEmbeddings, createTextSplitter, createVectorStore } from "../configs/langchain"
import { Document } from "langchain/document"
import { processContentFXN } from "../utils/RAG"
import { DEFAULT_CHUNK_OVERLAP, DEFAULT_CHUNK_SIZE } from "../configs/Constant"
import DocsModel from "../models/Docs"

export const Crawling = async (URL : string)  =>{
    const content = await tvly.extract([URL] , {})
    return {
        url : content.results[0]?.url , content : content.results[0]?.rawContent , 
    }
}

export const saveToMONGO = async (data: DocsData ) => {
    try {
        const newDocs = new DocsModel(data)
        console.log('saving to mongo');
        await newDocs.save()
        console.log('saved to mongp');
        // TODO: Implement actual MongoDB insertion logic here
        return newDocs
    } catch (error) {
        throw new Error(`Failed storing data in MongoDB: ${error.message}`);
    };
}

export const RAGworker = async (config: RAGconfig) => {
    try {
        const content = await Crawling(config.webURL)
        await StoreRAG({ ...config, content: content.content });
    } catch (error) {
        console.error("RAG Processing Error", error);
        throw new Error(`RAG Processing Failed: ${error.message}`);
    }
}

export const StoreRAG = async (data: RAGconfig & { content : string }) => {
    const processedDocs = processContentFXN(data.content)
    const textsplitter = createTextSplitter(
        data.RAG?.tokenPR || DEFAULT_CHUNK_SIZE, 
        data.RAG?.chunkOverlap || DEFAULT_CHUNK_OVERLAP)

    const doc = new Document({ pageContent: processedDocs }); //* Thank You
    const allSplits = await textsplitter.splitDocuments([doc]);
    const documentsWithBatch = allSplits.map((doc, index) => ({
        ...doc,
        metadata: { ...doc.metadata, batchID: data.docsId , type : data.type , url : data.webURL  },
      }));
    
    const ids = allSplits.map(( _ ,index) => `doc-${data.docsId}-${index}`);
    const embedding = createEmbeddings('data.webURL')
    const vectorStore = createVectorStore(embedding)
    console.log(documentsWithBatch);
    console.log('vector storage initialized');
    //TODO open vector after 
    // await vectorStore.addDocuments(documentsWithBatch, { ids });
    console.log('stored to vector storage');
}

export const pdfStored = async (data : RAGconfig & {content : string }) => {
    
}