import { vectorStore, llm } from "./central.js";

const query = "What strategies can be used to minimize privacy loss when making multiple queries?";

const filter = "batchID = 1740589197826";

const s = await vectorStore.similaritySearchWithScore(query,2, filter);

const finaldata = s.map(d => d[0].pageContent).join('\n\n');


llm.invoke([
    {
        "role": "system",
        "content": "You are a helpful assistant,. Provide responses based on the provided RAG data and use your knowledge when RAG is irrelevant. Ensure the answer is clear, well-structured, and directly to the point. Avoid unnecessary text unless the user requests details. Format responses properly without escape characters like '\\n'."
    }
    ,      
      
    { role: "user", content: finaldata + "\n\n" + query }
]).then((result) => {
    console.log({ answer : result.content , 
        score : result.usage_metadata.total_tokens
    });
});
