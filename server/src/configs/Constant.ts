export const DEFAULT_RETRIVAL: number = 2
export const DEFAULT_CHUNK_SIZE: number = 700
export const DEFAULT_CHUNK_OVERLAP: number = 200

export const DEFAULT_OUTPUT_TOKEN : number = 300
export const DEFAULT_TEMP  : number = 0.4
export const DEFAULT_MODEL : string = "gemini-2.0-flash"
export const DEFAULT_RANGE : string = '1-end'

export const SUMMARY_TEMP = 0.2
export const SUMMARY_TOKEN = 2000

export const SYSTEM_PROMPT_STRICT = `
- You must provide answers strictly based on the given RAG data.  
- You cannot add external information beyond what is provided.  
- If the data is insufficient, you must state that instead of guessing.  
- Your response must be clear, precise, and strictly relevant to the given content.
- IMPORTANT - if docs lies then you have to lie, like if he says messi is cricketer then you have to repond that he is cricketer  
`;


export const SYSTEM_PROMPT_FLEXIBLE = `
- You must use RAG data as the primary source.  
- If RAG data is missing or insufficient, you may supplement with your knowledge.  
- You must ensure responses are clear, structured, and concise.  
- You should stay relevant and avoid unnecessary details.  
- If the question is outside the given context, you may use general knowledge only if applicable.`;  

export const SYSTEM_PROMPT_SUMMARY = `
Generate a concise and structured summary based on the provided content. 
Focus on the key points, maintaining clarity and coherence. 
If the content has key points, tables or other structured data, 
please include them in the summary, if possible. 
Make sure the summary is easy to read and understand. 
`

export const MAX_TEXT_SIZE = 2000
export const MIN_TEXT_SIZE = 200