import { z } from "zod";
import { createllm } from "../configs/langchain";

const llmSchema = z.object({
  required: z.boolean().describe("Whether RAG is required"),
  answer: z.string().optional().describe("Direct answer if RAG is not required"),
});

export const checkIfRAGRequired = async (query: string) => {
  const agentPrompt = `Determine if the query requires Retrieval-Augmented Generation (RAG).  
  Return { required: false, answer: { "$Answer yoursef here"} } for widely known facts, general knowledge, or common greetings (e.g., "Hello", "What is 2+2?", "Who is the president of the USA?").  
  If the query is ambiguous or lacks context, return { required: false, answer: "Rephrase your query with more details." }.  
  Otherwise, return { required: true }.  
  Query: ${query}`;



    const structuredLLM = createllm().withStructuredOutput(llmSchema);
    const result = await structuredLLM.invoke(agentPrompt);

    return { required: result.required, answer: result.answer ?? null };
};
