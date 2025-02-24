import { vectorStore } from "./central.js";

const filter = "batchID = 1740428115641";
const s = await vectorStore.similaritySearchWithScore("what seems to have sized the township?",1, filter);

const finaldata =  s.map( d=> d[0].pageContent).join('\n\n');
console.log('final data',finaldata);