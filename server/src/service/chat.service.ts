import { SYSTEM_PROMPT_FLEXIBLE, SYSTEM_PROMPT_STRICT } from "../configs/Constant";
import { createllm } from "../configs/langchain";

export const processLLMStream = async (query: string, finalData: string, strict: boolean, temperature: number, maxOutputTokens: number, res: any) => {
    try {
        const llm = createllm(undefined, temperature, maxOutputTokens);
        const systemPrompt = strict ? SYSTEM_PROMPT_STRICT : SYSTEM_PROMPT_FLEXIBLE;
        const userPrompt = strict 
            ? `Answer strictly based on the following content:\n\n${finalData}\n\n${query}`
            : `${finalData}\n\nUse your knowledge if necessary to enhance the response.\n\n${query}`;

        res.setHeader("Content-Type", "text/plain");
        res.setHeader("Transfer-Encoding", "chunked");

        const stream = await llm.stream([
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
        ]);

        for await (const chunk of stream) {
            res.write(chunk.content || "");
        }

        res.end();
    } catch (error) {
        console.error("Error in LLM processing", error);
        res.status(500).json({ message: "LLM processing failed" });
    }
};
