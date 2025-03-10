import { RAGworker, saveToMONGO, StoreRAG, uploadImageToCloudinary } from "../service/add.service";
import { DEFAULT_CHUNK_OVERLAP, DEFAULT_CHUNK_SIZE, DEFAULT_MODEL, DEFAULT_RETRIVAL, SUMMARY_TEMP, SUMMARY_TOKEN } from "../configs/Constant";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { summarizer } from "../utils/global";
import { createllm } from "../configs/langchain";
import { RAGData } from "../types/web.type";

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

        if (!pdfFile) res.status(400).json({ message: "No PDF file uploaded" });
        console.log('image storing initialized');

        const randomUUID: string = crypto.randomUUID();
        const time: string = new Date().toISOString();
        let imageUrl : string = '';
        if (imageFile) {
            try {
                imageUrl = await uploadImageToCloudinary(imageFile.buffer, "chat-app/chat-img");
                console.log("Uploaded Image URL:", imageUrl);
            } catch (err) {
                console.error("Image Upload Error:", err);
                return res.status(500).json({ message: "Image upload failed" });
            }
        }
        console.log('image storing completed');

        let parsedRag : RAGData ;
        try {
            parsedRag = JSON.parse(rag);
        } catch {
            return res.status(400).json({ message: "Invalid RAG format" });
        }
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
        const filteredDocs = contents.filter((_doc, index) => {
            const pageNumber = index + 1;
            return pageNumber >= start && pageNumber <= end;
        });
        const pages = filteredDocs.length;
        const plainText = filteredDocs.map(doc => doc.pageContent).join("\n");

        const context= extractSummary(plainText);
        const summary = await summaryGen(context);


        await Promise.all([
            saveToMONGO({
                type: 'pdf',
                docsId: randomUUID,
                createdAt: time,
                aboutPdf: {
                    author,
                    category,
                    language,
                    description,
                    url: imageUrl,
                    title: name,
                    pages
                },
                summary,
                ...(parsedRag && { RAG: parsedRag })
            }),
            StoreRAG({
                type: 'pdf',
                docsId: randomUUID,
                content: plainText,
                ...(parsedRag && { RAG: parsedRag })
            })
        ]);

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
    const llm = createllm('gemini-1.5-pro', SUMMARY_TEMP, SUMMARY_TOKEN);
    const SYSTEM_PROMPT = `
    You are an advanced summarization AI. Your task is to generate a highly accurate and detailed summary strictly based on the given data.  
    - Do **not** add any external knowledge, assumptions, or interpretations.  
    - Use a **tabular format** if possible, or structured bullet points.  
    - Preserve key details, facts, and names as they appear in the input.  
    - Ensure clarity and conciseness while maintaining the meaning of the original text.  
    - **Avoid stopping midway** and make sure the summary is complete.  
    `;

    try {
        const response = await llm.invoke([
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: text }
        ]);
        
        if (response && response.content) {
            return String(response.content);
        } else {
            console.error("Error: No content in response");
            return "Summary generation failed.";
        }
    } catch (error) {
        console.error("Error while generating summary:", error);
        return "An error occurred during summary generation.";
    }
}
