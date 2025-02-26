import { START, END, MessagesAnnotation, StateGraph, MemorySaver, Annotation, messagesStateReducer } from "@langchain/langgraph";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { config } from "dotenv";
import readline from "readline";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
config();

const llm = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    temperature: 0,
    maxOutputTokens: 100,
});

const promptTemplate = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You are a helpful assistant. Answer all questions to the best of your ability in {language}.",
    ],
    // ["placeholder", "{messages}"],
    new MessagesPlaceholder('messages')
]);

const callModel = async (state) => {
    const prompt = await promptTemplate.invoke( { messages: state.messages, language: state.language || 'Hinglish' } );
    const response = await llm.invoke(prompt);
    return { messages: [...state.messages, response] };
};

const GraphAnnotation = Annotation.Root({
    ...MessagesAnnotation.spec,
    language: Annotation(),
  });
const workflow = new StateGraph(GraphAnnotation)
    .addNode('model', callModel)
    .addEdge(START, 'model')
    .addEdge('model', END);

const memory = new MemorySaver();
const workflow_LLM = workflow.compile({ checkpointer: memory });

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const interact = async () => {
    rl.question('You: ', async (input) => {
        const input2 = {
            messages: [
              {
                role: "user",
                content: input,
              },
            ],
            language: "English",
          };
        const result = await workflow_LLM.invoke(  input2  , { configurable: { thread_id: '123dsg' } });
        const botReply = result.messages[result.messages.length - 1].content;
        console.log(`Bot: ${botReply}`);
        interact();
    });
};

interact();
