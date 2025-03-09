import { SYSTEM_PROMPT_FLEXIBLE, SYSTEM_PROMPT_STRICT } from "../configs/Constant";
import { createllm } from "../configs/langchain";

export const processLLMStream = async (query: string, finalData: string, strict: boolean, temperature: number, maxOutputTokens: number, previousMessages: any[] = []) => {
    try {
        const llm = createllm(undefined, temperature, maxOutputTokens);
        const systemPrompt = strict ? SYSTEM_PROMPT_STRICT : SYSTEM_PROMPT_FLEXIBLE;
        
        const userPrompt = strict 
            ? `You are an AI assistant that provides answers strictly based on the provided content. If the question is not relevant to the content, respond with: "The question is not relevant to the provided content."\n\nContent:\n${finalData}\n\nQuestion: ${query}`
            : `You are an AI assistant that can use both the provided content and your own knowledge to answer questions. If the provided content is relevant, use it to enhance your response. If not, rely on your own knowledge.\n\nContent:\n${finalData}\n\nQuestion: ${query}`;
        
        const messages = [
            { role: "system", content: systemPrompt },
            ...previousMessages,
            { role: "user", content: userPrompt }
        ];
        
        const result = await llm.invoke(messages);
        return result;
    } catch (error) {
        console.error("Error in LLM processing", error);
    }
};
