import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { vectorStore } from "./central.js";
export const cheerIo = new CheerioWebBaseLoader(
    "http://towardsdatascience.com/when-optimal-is-the-enemy-of-good-high-budget-differential-privacy-for-medical-ai/",
    {
      selector : 'main'
    }
  )
  export const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 120,
    separators: [" ### "], 
  });

  
const document = await cheerIo.load();
function addParagraphSeparators(rawText) {
// Split the text by newline and filter out empty lines
let paragraphs = rawText
  .replace(/\s+/g, ' ')
  .trim()
  .split('. ')
  .map(sentence => sentence.trim())
  .filter(sentence => sentence.length > 0);
    
  return paragraphs.join(' ### ');
}

const processedText = addParagraphSeparators(document[0].pageContent);

const arrayOfText = await textSplitter.splitText(processedText);
const timestamp = Date.now();
const finalData = arrayOfText.map((text) => ({
  pageContent: text,
  metadata: {...document[0].metadata , batchID : timestamp},
}));

// console.log(final);
console.log('vector store started'); 
const ids = finalData.map(( _ ,index) => `doc-${timestamp}-${index}`);
await vectorStore.addDocuments(finalData, { ids });
console.log('vector store ended');