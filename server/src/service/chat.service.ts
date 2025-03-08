import { SYSTEM_PROMPT_FLEXIBLE, SYSTEM_PROMPT_STRICT } from "../configs/Constant";
import { createllm } from "../configs/langchain";

export const processLLMStream = async (query: string, finalData: string, strict: boolean, temperature: number, maxOutputTokens: number) => {
    try {
        const llm = createllm(undefined, temperature, maxOutputTokens);
        const systemPrompt = strict ? SYSTEM_PROMPT_STRICT : SYSTEM_PROMPT_FLEXIBLE;
        const userPrompt = strict 
            ? `Answer strictly based on the following content: if question is not relavent then dont answer and give some reponse accordingly \n\n${finalData}\n\n${query}`
            : `${finalData}\n\nUse your knowledge if necessary to enhance the response.\n\n${query}`;

        const stream = await llm.invoke([
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
        ]);
        return stream
        // for await (const chunk of stream) {
        //     res.write(chunk.content || "");
        // }

    } catch (error) {
        console.error("Error in LLM processing", error);
    }
};
