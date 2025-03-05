export interface WebData{
    type: 'web';
    webURL: string;
    aboutWeb: {
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
    WebId: string;
    createAt: string;
};


export interface RAGconfig {
    type: 'web';
    webURL: string;
    webId : string ;
    RAG?: {  // Made optional
        retrival?: number;
        tokenPR?: number;
        chunkOverLap? : number
    };
}

export interface tavilyOut {
    url : string ,
    content : string 
}
