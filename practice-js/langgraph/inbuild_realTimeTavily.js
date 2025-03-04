import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { MemorySaver } from "@langchain/langgraph";
import {config} from "dotenv"
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { HumanMessage } from "@langchain/core/messages";

config()
const agentTool = [new TavilySearchResults({maxResults : 1})]
const llm = new ChatGoogleGenerativeAI({
    model : "gemini-2.0-flash",
    temperature: 0,
});

const checkpointer  = new MemorySaver()

const realTimeAgent = createReactAgent({
    llm : llm ,
    tools : agentTool ,
    checkpointSaver : checkpointer
})

const agentFinalState = await realTimeAgent.invoke(
    { messages: [new HumanMessage("what is the current weather in shenzen, china")] },
    { configurable: { thread_id: "42" } },
  );

console.log(agentFinalState.messages[agentFinalState.messages.length - 1].content);

const agentFinalState2 = await realTimeAgent.invoke(
    { messages: [new HumanMessage("what about india?")] },
    { configurable: { thread_id: "42" } },
);
console.log(agentFinalState2.messages[agentFinalState2.messages.length - 1].content);