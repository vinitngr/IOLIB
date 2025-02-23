import { vectorStore } from "./central.js";

const filter = "batchID = 1740321806399";
const s = await vectorStore.similaritySearchWithScore("How does the document describe text processing?",1, filter);

const finaldata =  s.map( d=> d[0].pageContent).join('\n\n');
console.log('final data',finaldata);