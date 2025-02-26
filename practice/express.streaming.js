import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { config } from "dotenv";
import express from "express";
import { marked } from "marked";

config();
const app= express()
app.use(express.json())
const PORT = 3000
const llm = new ChatGoogleGenerativeAI({
    model : "gemini-2.0-flash",
    temperature: 0,
});

app.post('/ask', async (req, res) => {
    console.table(req.body)
    console.assert(req.body.text, "Text is required")

    const text = req.body.text.trim();
    if (!text) return res.status(400).json({ error: "Text is required" });

    const result = await llm.stream(text);
    for await ( const chunk of result ){
        res.write(chunk.content)
    }
    res.end();
})

app.get('/:say', async (req, res) => {
    const text = req.params.say.trim();
    const result = await llm.stream(text);

    res.setHeader('Content-Type', 'text/markdown');
    for await ( const chunk of result ){
        res.write(chunk.content)
    }
    res.end();
})

app.listen(PORT, () => {
    console.log('Server is running on port' , PORT)
})


    // const numbers = Array.from({ length: 20 } , ()=> Math.floor(Math.random() * 100));
    // console.table(numbers.map(num => ({
    //     Number: num,
    //     Square: num * num,
    //     Cube: num * num * num
    // })));
    