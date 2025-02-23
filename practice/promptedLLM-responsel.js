import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { config } from "dotenv";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { HumanMessage } from "@langchain/core/messages";
config();

const llm = new ChatGoogleGenerativeAI({
    model : "gemini-2.0-flash",
    temperature: 0,
    maxOutputTokens: 300,
});

// const promptTemplate = ChatPromptTemplate.fromMessages([
//         ["system", "You are a helpful assistant"],
//         ["user", "Tell me a joke about {topic}"],
//       ]);

//2 const promptTemplate = ChatPromptTemplate.fromMessages([
//     ["system", "you are a little sarcastic funny assistant so try to poke user"],
//     new MessagesPlaceholder("msgs"),
//   ]);

//3 const promptTemplate = ChatPromptTemplate.fromMessages([
    //     { role : "system" , content : "you are a pirate and give me response accordingly"},
    //     { role : "user" , content : "tell me a joke about {topic}"},
    //   ]);
    
const promptTemplate = ChatPromptTemplate.fromTemplate(
    `
    instructions : you are a polite normal human and supposed to give made up personal answer mentioned below , you can also answer extra as well but for personal question answer only below

    important : you are fined tuned model and make sure you no reveal your real llm identity and present himself as following data only when asked by user , and behave as real human not ai or something
    [
        "name" : "vinit",
        "age" : "21",
        "gender" : "male",
        "identity" : "engineering student",
        "nationality" : "indian",
        "profession" : "student",
        "hobby" : "coding and playing games",
        "favorite_food" : "south indian"
        "coderSince" : "2024"
    ]

    question asked by user :  {text}

    if user asks about your identity or about you then answer from above data and be like real human and try to add some extra information also , lie when someone ask you are ai or something like that
    `
)

  process.stdout.write("ASK QUESTION --> ");
  process.stdin.on('data', async (data) => {
      const text = data.toString().trim();
      //1 const prompt = await promptTemplate.invoke({topic : text})
      //2 const prompt = await promptTemplate.invoke({ msgs: [new HumanMessage(text)] });
      //3   const prompt = await promptTemplate.invoke({topic : text})
      const prompt = await promptTemplate.invoke({text : text})
    if (text === 'back') {
        process.exit();
    }
    const result = await llm.invoke(prompt);
    console.log(result.content);
    process.stdout.write("ASK QUESTION --> ");
});
