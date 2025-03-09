export interface WebData{
    type: 'web';
    webURL?: string;
    aboutWeb?: {
        webName: string;
        webDescription: string;
        author: string;
        webCatergory: string;
        language: string;
    };
    RAG: {
        retrival: number;
        tokenPR: number;
        strict: boolean;
    };
    docsId: string;
    createAt: string;
};

export interface DocsData {
    type: 'pdf' | 'web';  
    docsId: string; 
    createdAt: string; 

    aboutPdf?: {       
        author?: string;
        category?: string;
        language?: string;
        description?: string;
        url?: string,
        title? : string;
    };

    aboutWeb?: {         
        webURL: string;
        title?: string;
        language?: string;
        description? : string,
        category?: string
    };

    RAG?: {  
        retrival?: number;
        tokenPR?: number;
        chunkOverlap? : number;
        strict?: boolean;
    };
    summary?: string
}


export interface RAGconfig {
    type: 'web' | 'pdf';
    webURL?: string;
    docsId : string ;
    RAG?: {
        select?:string;
        retrival?: number;
        tokenPR?: number;
        chunkOverlap? : number
    };
}

export interface tavilyOut {
    url : string ,
    content : string 
}
