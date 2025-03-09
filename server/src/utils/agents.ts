import { z } from "zod";
import { createllm } from "../configs/langchain";

const llmSchema = z.object({
  required: z.boolean().describe("Whether RAG is required"),
  answer: z.string().optional().describe("Direct answer if RAG is not required"),
});

export const checkIfRAGRequired = async (query: string , description : string) => {
    const agentPrompt = `You are an AI agent that determines if Retrieval-Augmented Generation (RAG) is required for answering a query.  

    - Return { required: false, answer: { "$Answer yourself here" } } **only** if the query is a widely known fact, a basic general knowledge question, or a generic greeting (e.g., "Hello", "What is 2+2?", "Who is the president of the USA?").  
    - **For all other queries, including those requiring domain-specific knowledge, deeper research, or contextual references, return { required: true }.**  
    - If the query is ambiguous or lacks context, return { required: false, answer: "Please rephrase your query with more details." }.  

    Query: ${query}`;
    const structuredLLM = createllm().withStructuredOutput(llmSchema);
    const result = await structuredLLM.invoke(agentPrompt);

    return { required: result.required, answer: result.answer ?? null };
};