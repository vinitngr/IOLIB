import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { config } from "dotenv";
import { marked } from "marked";
import DOMPurify from 'isomorphic-dompurify'

config();

const llm = new ChatGoogleGenerativeAI({
    model : "gemini-2.0-flash",
    temperature: 0,
    maxOutputTokens: 300,
});

process.stdout.write("ASK QUESTION --> ");
process.stdin.on('data', async (data) => {
    const text = data.toString().trim();
    if (text === 'back') {
        process.exit();
    }
    const result = await llm.stream(text);

    for await ( const chunk of result ) {  //designed explicity for streaming purpose
        // console.log(chunk);
        process.stdout.write(DOMPurify.sanitize(marked(chunk.content)));
        // console.log(DOMPurify.sanitize(marked(chunk.content)));  //add new line by default
    }
    process.stdout.write("ASK QUESTION --> ");
});
