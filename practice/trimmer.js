import { START, END, MessagesAnnotation, StateGraph, MemorySaver, Annotation } from "@langchain/langgraph";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { config } from "dotenv";
import readline from "readline";  
import { HumanMessage, trimMessages } from "@langchain/core/messages";
import { ChatPromptTemplate } from "@langchain/core/prompts";
config();

const llm = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    temperature: 0,
    maxOutputTokens: 300,
});

const promptTemplate = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You are a helpful assistant. Answer all questions to the best of your ability in {language}.",
    ],
    ["placeholder", "{messages}"],
]);

const trimmer = trimMessages({
    maxTokens: 2,
    strategy: "last",
    tokenCounter: (msgs) => msgs.length,
    includeSystem: true,
    allowPartial: false,
    startOn: "human",
});
const GraphAnnotation = Annotation.Root({
    ...MessagesAnnotation.spec,
    language: Annotation(),
  });

const callModel = async (state) => {
    const trimmedMessages = await trimmer.invoke(state.messages);
    const prompt = await promptTemplate.invoke({ messages: trimmedMessages, language: "English" });
    const response = await llm.invoke(prompt);
    return { messages: [...trimmedMessages, response] };
};

const workflow = new StateGraph(GraphAnnotation)
    .addNode('model', callModel)
    .addEdge(START, 'model')
    .addEdge('model', END); 

const memory = new MemorySaver();
const llm2 = workflow.compile({ checkpointer: memory });

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const interact = async () => {
    rl.question('You: ', async (input) => {
        const input2 = {
            messages: [...messages, new HumanMessage(input)],
            language: "English",
          };

        const result = await llm2.invoke({ messages: requestPayload.dialogue }, { configurable: { thread_id: "12243" } });

        const botReply = result.messages[result.messages.length - 1].content;
        console.log(`Bot: ${botReply}`);

        conversationHistory.push(new HumanMessage(botReply));  // ✅ Store bot response
        interact();  // Continue interaction
    });
};

interact();
