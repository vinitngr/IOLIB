import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { END,  MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
import { config } from "dotenv"
import { HumanMessage } from "@langchain/core/messages";
import { ToolNode } from "@langchain/langgraph/prebuilt";
config()
const llm = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    temperature: 0,
});

const tools = [new TavilySearchResults({ maxResults: 1 })]
const model = llm.bindTools(tools);
const toolNode = new ToolNode(tools)
function shouldContinue({ messages }) {
    const lastMessage = messages[messages.length - 1]

    if (lastMessage.tool_calls?.length) {
        return "tools";
    }
    return END;
}

async function callModel(state) {
    const response = await model.invoke(state.messages);
  
    return { messages: [response] };
  }

const workflow = new StateGraph(MessagesAnnotation)
  .addNode("agent", callModel)
  .addEdge(START, "agent")
  .addConditionalEdges("agent", shouldContinue)
  .addNode("tools", toolNode)
  .addEdge("tools", "agent")

const app = workflow.compile()  

const finalState = await app.invoke({
    messages: [new HumanMessage("what is the weather in sf in short")],
  });
console.log(finalState.messages[finalState.messages.length - 1].content);

const finalState2= await app.invoke({
    messages: [new HumanMessage("tell me a joke")],
})
console.log(finalState2.messages[finalState2.messages.length - 1].content);