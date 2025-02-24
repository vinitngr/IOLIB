import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { config } from "dotenv";
import {z} from 'zod';
config();

const llm = new ChatGoogleGenerativeAI({
    model : "gemini-2.0-flash",
    temperature: 0,
    maxOutputTokens: 300,
});


const llmSchema = z.object({
  aggressiveness : z.number().min(0).max(10).describe('The agression level of the message. 0 is not agressive, 10 is very agressive.'),
  context: z.string().describe('The context of the passage in shot form'),
  language: z.string().describe('language of passage'),
});

const structuredLLM = llm.withStructuredOutput(llmSchema);
const result = await structuredLLM.invoke(
    `
    Extract the desired information from the following passage.

    Only extract the properties mentioned in the 'Classification' function.

    Passage:
    Ah, I see now! Since you specifically asked Google Gemini Flash, and the response is "my name is anthropic," it seems like the model is defaulting to its own name (Anthropic) in the response, which might not be the expected behavior.
    It could be that the model (likely based on Anthropic's design) is identifying itself as "Anthropic" when asked for its name. If you were expecting a more human-like or custom name, it could be due to how the Gemini Flash model is trained or responding to such queries.
    If you need the model to provide a specific name or if it's important for your application, you might need to guide it with a more specific query or context.
`
);
console.log(result)