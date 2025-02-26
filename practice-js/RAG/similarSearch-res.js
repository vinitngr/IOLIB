import { vectorStore , llm } from "./central.js";

const filter = "batchID = 1740589197826";
const s = await vectorStore.similaritySearchWithScore("Artificial Intelligence When Optimal is the Enemy of Good: High-Budget Differential Privacy for Medical AI Can we guarantee patient privacy without sacrificing model accuracy",2, filter);


const finaldata =  s.map( d=> d[0].pageContent).join('\n\n');
console.log('final data',finaldata);


llm.invoke([
    { role: "system", content: "You are a helpful assistant. Provide responses strictly based on the provided text. Do NOT assume or infer any information that is not explicitly stated , I am providing you The RAG retrived data so you have to take its reference for answer the things" },
    { role: "user", content: finaldata + "Artificial Intelligence When Optimal is the Enemy of Good: High-Budget Differential Privacy for Medical AI Can we guarantee patient privacy without sacrificing model accuracy." }
]).then((result) => {
    console.log(result);
});
