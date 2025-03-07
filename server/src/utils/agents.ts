import { z } from "zod";
import { createllm } from "../configs/langchain";

const llmSchema = z.object({
  required: z.boolean().describe("Whether RAG is required"),
  answer: z.string().optional().describe("Direct answer if RAG is not required"),
});

export const checkIfRAGRequired = async (query: string) => {
    const agentPrompt = `Determine if the query requires Retrieval-Augmented Generation (RAG).  
                     Use RAG only for database-specific queries, not general knowledge.  
                     Respond as { required: boolean, answer?: string }.  
                     If RAG isn't needed, provide the answer.  
                     Query: ${query}`;


    const structuredLLM = createllm(undefined, 0, 30).withStructuredOutput(llmSchema);
    const result = await structuredLLM.invoke(agentPrompt);

    return { required: result.required, answer: result.answer ?? null };
};
