import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { config } from "dotenv";
import { marked } from "marked";
import DOMPurify from 'isomorphic-dompurify'

config();

const llm = new ChatGoogleGenerativeAI({
    model : "gemini-2.0-flash",
    temperature: 0,
    maxOutputTokens: 300,
    baseUrl: "https://api.genai.ai/v1",
});

process.stdout.write("ASK QUESTION --> ");
process.stdin.on('data', async (data) => {
    const text = data.toString().trim();
    if (text === 'back') {
        process.exit();
    }
    const result = await llm.invoke(text);
    console.log(DOMPurify.sanitize(marked(result.content)));
    process.stdout.write("ASK QUESTION --> ");
});
