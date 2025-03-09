import { RAGworker, saveToMONGO, StoreRAG, uploadImageToCloudinary } from "../service/add.service";
import { DEFAULT_CHUNK_OVERLAP, DEFAULT_CHUNK_SIZE, DEFAULT_MODEL, DEFAULT_RETRIVAL, SUMMARY_TEMP, SUMMARY_TOKEN } from "../configs/Constant";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { summarizer } from "../utils/global";
import { pdfSchema , ragSchema , webSchema } from "../types/zod.validation";
import { createllm } from "../configs/langchain";

export const testController = (_req: any, res: any) => {
    res.status(200).json({
        message: "test route check"
    })
}

export const addwebController = async (req: any, res: any) => {
    try {
        // if(res.locals.user.type !== 'admin') {
        //     return res.status(401).json({ message: "Not admin enough to add" });
        // }
        console.log('entered add web');
        // const parsedData = webSchema.safeParse(req.body);
        // if (!parsedData.success) {
        //     return res.status(400).json({
        //         message: "Validation Error",
        //         errors: parsedData.error.format()
        //     });
        // }
        // const addData = parsedData.data;
        const addData = req.body;
        if (!addData.webURL) {
            return res.status(400).json({ error: "webURL is required" });
        }

        const randomUUID: string = crypto.randomUUID();
        const time: string = new Date().toISOString();
    
        console.log('asked for summary');
        const summaryResult = await summarizer(addData.webURL, addData.RAG?.strict);
        const summary = typeof summaryResult === "string" ? summaryResult : JSON.stringify(summaryResult);
        console.log('summary generated');
        console.log('mongo storing started');
        await saveToMONGO({
            type: 'web',
            docsId: randomUUID,
            createdAt: time,
            aboutWeb: {
                webURL: addData.webURL,
                title: addData.title || "",
                description: addData.description || '',
                language: addData.language || '',
                category: addData.category || ''
            },
            RAG: addData.RAG ? {
                retrival: addData.RAG.retrival || DEFAULT_RETRIVAL,
                tokenPR: addData.RAG.tokenPR || DEFAULT_CHUNK_SIZE,
                chunkOverlap: addData.RAG.chunkOverlap || DEFAULT_CHUNK_OVERLAP,
                strict: addData.RAG.strict || false
            } : undefined,
            summary
        });
        console.log('mongo Storing finished');

        console.log('Rag process started');
        await RAGworker({
            type: 'web',
            webURL: addData.webURL,
            docsId: randomUUID,
            ...(addData.RAG && { RAG: addData.RAG })
        });
        console.log('Rag process finished');


        console.log('Response sended');
        res.status(200).json({
            message: 'Web processed successfully',
            type: 'web',
            webURL: addData.webURL,
            mongoSave: true,
            RAGSave: true,
            docsId: randomUUID,
            createAt: time,
        });

    } catch (error) {
        console.error("Error in Saving Data", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
    //TODO
    //TODO:HACKATHON :ZOD VALIDATION
    //TODO check url valid or not

};

export const addPdfController = async (req: any, res: any) => {
    try {
        // if(res.locals.user.type !== 'admin') {
        //     return res.status(401).json({ message: "Not admin enough to add" });
        // }
        // const parsedData = pdfSchema.safeParse(req.body);
        // if (!parsedData.success) {
        //     return res.status(400).json({ 
        //         message: "Validation Error", 
        //         errors: parsedData.error.format() 
        //     });
        // }
        const { author, category, language, description, rag , name } = req.body;
        const pdfFile = req.files?.pdf?.[0]; 
        const imageFile = req.files?.image?.[0]; 
        // console.log(author , category , language , description , rag);
        //==========================================================================================//
        console.log('image storing initialized');
        let imageUrl : string = '';
        if(imageFile) {
            console.log('image uploading to cloudinary');
            imageUrl = await uploadImageToCloudinary(imageFile.buffer, "chat-app/chat-img");
            console.log("Uploaded Image URL:", imageUrl);
        }
        console.log('image storing completed');
        //==========================================================================================//

        if (!pdfFile) {
            res.status(400).json({ message: "No PDF file uploaded" });
            return;
        } 

        const randomUUID: string = crypto.randomUUID();
        const time: string = new Date().toISOString();
        interface RAGData {
            range?: string;
            retrival?: number;
            tokenPR?: number;
            chunkOverlap?: number;
            strict?: boolean;
        }
        let parsedRag: RAGData;
        parsedRag = JSON.parse(rag);
    
        if (typeof parsedRag === "string") {
            parsedRag = JSON.parse(parsedRag);
        }
        console.log(parsedRag);
        // try {
            // parsedRag = JSON.parse(rag);
    
            // if (typeof parsedRag === "string") {
            //     parsedRag = JSON.parse(parsedRag);
            // }
        //     // Commented out the validation part
        //     // const validation = ragSchema.safeParse(parsedRag);
        //     // if (!validation.success) {
        //     //     return res.status(400).json({ message: "Invalid rag data", errors: validation.error.format() });
        //     // }
        
        //     // parsedRag = validation.data;
        // } catch (error) {
        //     return res.status(400).json({ message: "Invalid stringified JSON format" });
        // }
        const pdfBuffer = pdfFile.buffer;
        const pdfBlob = new Blob([pdfBuffer], { type: pdfFile.mimetype });
        const loader = new PDFLoader(pdfBlob);

        const contents = await loader.load();
        const [start, end] = parsedRag.range.split("-").map((v) => (v === "end" ? Infinity : parseInt(v)));
        const filteredDocs = contents.filter((doc, index) => {
            const pageNumber = index + 1;
            return pageNumber >= start && pageNumber <= end;
        });
        const plainText = filteredDocs.map(doc => doc.pageContent).join("\n");

        const context= extractSummary(plainText);
        const summary = await summaryGen(context);
        // console.log(summary , typeof summary);
        //==========================================================================================//
        console.log('mongo db storing');
        await saveToMONGO({
            type: 'pdf',
            docsId: randomUUID,
            createdAt: time,
            aboutPdf: {
                author,
                category,
                language,
                description,
                url : imageUrl,
                title : name,
            },
            summary : summary ,
            ...(parsedRag && { RAG: parsedRag })
        });
        console.log('mongo db stored');
        //==========================================================================================//

       

        //==========================================================================================//
        console.log('rag initialized');
        await StoreRAG({
            type: 'pdf',
            docsId: randomUUID,
            content: plainText,
            ...(parsedRag && { RAG: parsedRag })
        })
        console.log('rag done');
        //==========================================================================================//

        console.log('response sended');
        res.status(200).json({
            message: "PDF processed successfully",
            type: 'pdf',
            pdfDetails: {
                originalName: pdfFile.originalname,
                mimeType: pdfFile.mimetype,
                size: pdfFile.size,
                url : imageUrl
            },
            mongoSave: true,
            RAGSave: true,
            docsId: randomUUID,
            createAt: time,
        });
    } catch (error) {
        console.error("Error", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



function extractSummary(text: string, maxTokens: number = 1000): string {
    const words = text.split(/\s+/); 
    if (words.length <= maxTokens) return text;

    const firstPart = words.slice(0, maxTokens / 2).join(" ");
    const lastPart = words.slice(-maxTokens / 2).join(" ");

    return `${firstPart} ... ${lastPart}`;
}

async function summaryGen(text: string) {
    const llm = createllm(DEFAULT_MODEL, SUMMARY_TEMP, SUMMARY_TOKEN);
    const SYSTEM_PROMPT = `
    You are an advanced summarization AI. Your task is to generate a highly accurate summary based strictly on the given data.  
    - Do **not** add any external knowledge, assumptions, or interpretations.  
    - Preserve key details, facts, and names as they appear in the input.  
    - Ensure clarity and conciseness while maintaining the meaning of the original text.  
    - Format the summary in a structured way if applicable (e.g., bullet points, headings).  
    `;

    const response = await llm.invoke([
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: text }
        ]);
    //  console.log(response);
    return String(response.content)
}