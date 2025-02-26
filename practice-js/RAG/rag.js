import { vectorStore , textSplitter , loader } from "./central.js";
const contents = await loader.load(); 

const processedDocs = contents.map(doc => ({
  ...doc,
  pageContent: doc.pageContent
    .replace(/\s+/g, ' ')
    .replace(/[^\w\s.,!?'-]/g, '') 
    .trim() 
}));


const allSplits = await textSplitter.splitDocuments(processedDocs); //split documents

const timestamp = Date.now();
const documentsWithBatch = allSplits.map((doc, index) => ({
  ...doc,
  metadata: { ...doc.metadata, batchID: timestamp },
}));


console.log('vector store started'); 
const ids = allSplits.map(( _ ,index) => `doc-${timestamp}-${index}`);
await vectorStore.addDocuments(documentsWithBatch, { ids });
console.log('vector store ended');



// embeddings.embedQuery(allSplits[0].pageContent).then((result) => {
//   console.log(result.length);
// })


// console.log(
//   contents[0].pageContent
//     .replace(/(\r\n|\n|\r|\s\s+)/gm, "")
//     .replace(/_/g, "")
// );


// const documents = [
//   new Document({
//     pageContent:
//       "Dogs are great companions, known for their loyalty and friendliness.",
//     metadata: { source: "mammal-pets-doc" },
//   }),
//   new Document({
//     pageContent: "Cats are independent pets that often enjoy their own space.",
//     metadata: { source: "mammal-pets-doc" },
//   }),
// ];
