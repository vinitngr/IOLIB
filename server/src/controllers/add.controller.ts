import { RAGworker, saveToMONGO, StoreRAG, uploadImageToCloudinary } from "../service/add.service";
import { DEFAULT_CHUNK_OVERLAP, DEFAULT_CHUNK_SIZE, DEFAULT_RANGE, DEFAULT_RETRIVAL } from "../configs/Constant";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { summarizer } from "../utils/global";
import { z } from 'zod'


const pdfSchema = z.object({
    author: z.string().optional(),
    category: z.string().optional(),
    language: z.string().optional(),
    description: z.string().optional(),
    rag: z.string().optional(),
});

const webSchema = z.object({
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
export const testController = (req: any, res: any) => {
    res.status(200).json({
        message: "test route check"
    })
}

export const addwebController = async (req: any, res: any) => {
    try {
        const parsedData = webSchema.safeParse(req.body);
        if (!parsedData.success) {
            return res.status(400).json({
                message: "Validation Error",
                errors: parsedData.error.format()
            });
        }
        const addData = parsedData.data;

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
        const parsedData = pdfSchema.safeParse(req.body);
        if (!parsedData.success) {
            return res.status(400).json({ 
                message: "Validation Error", 
                errors: parsedData.error.format() 
            });
        }
        const { author, category, language, description, rag } = parsedData.data;
        const pdfFile = req.files?.pdf?.[0]; 
        const imageFile = req.files?.image?.[0]; 
        let imageUrl : string = '';
        if(imageFile) {
            console.log('image uploading to cloudinary');
            imageUrl = await uploadImageToCloudinary(imageFile.buffer, "chat-app/chat-img");
            console.log("Uploaded Image URL:", imageUrl);
        }

        if (!pdfFile) {
            res.status(400).json({ message: "No PDF file uploaded" });
            return;
        }

        const randomUUID: string = crypto.randomUUID();
        const time: string = new Date().toISOString();

        let parsedRag = JSON.parse(rag)
        if (typeof parsedRag === "string") {
            parsedRag = JSON.parse(parsedRag);
        }
        parsedRag.range = parsedRag.range ?? DEFAULT_RANGE;

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
                url : imageUrl
            },
            ...(parsedRag && { RAG: parsedRag })
        });
        console.log('mongo db stored');

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

        console.log('rag initialized');
        await StoreRAG({
            type: 'pdf',
            docsId: randomUUID,
            content: plainText,
            ...(parsedRag && { RAG: parsedRag })
        })
        console.log('rag done');
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