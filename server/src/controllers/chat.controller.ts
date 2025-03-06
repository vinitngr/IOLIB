import { Request, Response } from "express";
import { createEmbeddings, createllm, createVectorStore } from "../configs/langchain";
import { SYSTEM_PROMPT_FLEXIBLE, SYSTEM_PROMPT_STRICT } from "../configs/Constant";
import DocsModel from "../models/Docs";

export const chatTest = (req: Request, res: Response) => {
    res.send("Chat test route is working");
};

export const chatHandler = (req: Request, res: Response) => {
    const { id } = req.params;
    res.send(`Chat API is working for ID: ${id}`);
};

export const llmHandler = async (req: any , res: any) => {
    try {
        const { id } = req.params;
        const { query, type, retrival = 2, temperature = 0.7, maxOutputTokens = 512 , strict = false} = req.body;

        if (!query || !type) {
            return res.status(400).json({ message: "Query and type are required" });
        }

        const filter = `batchID = '${id}' AND type = '${type}'`;

        const embedding = createEmbeddings('vinit');
        const VectorStore = createVectorStore(embedding);
        const searchResults = await VectorStore.similaritySearchWithScore(query, retrival, filter);

        const finalData = searchResults.map(d => d[0].pageContent).join("\n\n");
        const llm = createllm(undefined, temperature, maxOutputTokens);


        const systemPrompt = strict ? SYSTEM_PROMPT_STRICT : SYSTEM_PROMPT_FLEXIBLE;
        
        const userPrompt = strict 
            ? `Answer strictly based on the following content:\n\n${finalData}\n\n${query}`
            : `${finalData}\n\nUse your knowledge if necessary to enhance the response.\n\n${query}`;
        
        const result = await llm.invoke([
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
        ]);
        
        res.json({
            id,
            query,
            type,
            searchResults,
            answer: result.content,
            tokens : {
                inputToken: result.usage_metadata?.input_tokens,
                outoutToken: result.usage_metadata?.output_tokens,
                totalToken : result.usage_metadata?.total_tokens
            },
            finalData
        });

    } catch (error) {
        console.error("Error in llmHandler", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const docsSummary = async (req: any  , res: any) => {
    try {
        const { id } = req.params;

        const doc = await DocsModel.findOne({ docsId: id }).select("summary");

        if (!doc) {
            return res.status(404).json({ message: "Document not found" });
        }

        res.json({ 
            id ,
            summary: doc.summary 
        });

    } catch (error) {
        console.error("Error in docsSummary:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};