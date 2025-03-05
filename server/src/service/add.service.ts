import { RAGconfig, WebData } from "../types/web.type"
import { tvly } from "../configs/tavily"
import { createEmbeddings, createTextSplitter, createVectorStore } from "../configs/langchain"
import { Document } from "langchain/document"
import { processContentFXN } from "../utils/RAG"
import { DEFAULT_CHUNK_OVERLAP, DEFAULT_CHUNK_SIZE } from "../configs/Constant"

export const Crawling = async (URL : string)  =>{
    const content = await tvly.extract([URL] , {})
console.log(content);
    return {
        url : content.results[0]?.url , content : content.results[0]?.rawContent , 
    }
}

export const saveToMONGO = async (data: WebData ) => {
    try {
        // TODO: Implement actual MongoDB insertion logic here
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

const StoreRAG = async (data: RAGconfig & { content : string }) => {
    const processedDocs = processContentFXN(data.content)
    const textsplitter = createTextSplitter(
        data.RAG?.tokenPR || DEFAULT_CHUNK_SIZE, 
        data.RAG?.chunkOverLap || DEFAULT_CHUNK_OVERLAP)

    const doc = new Document({ pageContent: processedDocs }); //* Thank You
    const allSplits = await textsplitter.splitDocuments([doc]);
    const documentsWithBatch = allSplits.map((doc, index) => ({
        ...doc,
        metadata: { ...doc.metadata, batchID: data.webId , type : 'web' , url : data.webURL  },
      }));
    
    const ids = allSplits.map(( _ ,index) => `doc-${data.webId}-${index}`);
    const embedding = createEmbeddings('data.webURL')
    const vectorStore = createVectorStore(embedding)
    console.log(processedDocs);
    // await vectorStore.addDocuments(documentsWithBatch, { ids });
}
