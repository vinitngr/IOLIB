import { load } from 'cheerio';
import { DEFAULT_MODEL, MAX_TEXT_SIZE, MIN_TEXT_SIZE, SUMMARY_TEMP, SUMMARY_TOKEN, SYSTEM_PROMPT_SUMMARY } from '../configs/Constant';
import { createllm } from '../configs/langchain';

export const extractWebData = async (webURL: string) => {
    try {
        const response = await fetch(webURL);
        const data = await response.text();
        const $ = load(data);

        const headings: { [key: string]: Array<{ heading: string; reference: string }> } = {
            h1: [], h2: [], h3: [], h4: [], h5: [], h6: []
        };

        const extractReferenceText = (el, tagName) => {
            let referenceText = '';
            let nextElement = $(el).next();

            while (nextElement.length > 0 && referenceText === '') {
                const text = $(nextElement).text().trim();
                if (text) {
                    const sentences = text.split('.');

                    let maxSentences = 1;
                    if (tagName === 'h1') {
                        maxSentences = 4;
                    } else if (tagName === 'h2') {
                        maxSentences = 3;
                    }

                    if (sentences.length > 1) {
                        referenceText = sentences.slice(0, maxSentences).join('.').trim() + '.';
                        break;
                    }
                }
                nextElement = $(nextElement).next();
            }

            return referenceText;
        };

        $('h1, h2, h3, h4, h5, h6').each((_, el) => {
            const tagName = $(el).prop('tagName').toLowerCase();
            const headingText = $(el).text().trim();

            const referenceText = extractReferenceText(el, tagName);

            headings[tagName].push({ heading: headingText, reference: referenceText });
        });

        const calculateTextSize = (headings) => {
            return Object.values(headings)
                .flatMap((content: Array<{ heading: string; reference: string }>) => content.map((item) => item.heading + item.reference))
                .join(' ')
                .length;
        };

        let totalTextSize = calculateTextSize(headings);

        if (totalTextSize > MAX_TEXT_SIZE) {
            delete headings.h4;
            delete headings.h5;
            delete headings.h6;
            totalTextSize = calculateTextSize(headings);
        }

        if (totalTextSize > MAX_TEXT_SIZE) {
            Object.entries(headings).forEach(([tag, content]) => {
                if (tag === 'h3' || tag === 'h4' || tag === 'h5' || tag === 'h6') {
                    content.forEach((item) => {
                        const sentences = item.reference.split('.');
                        if (sentences.length > 1) {
                            item.reference = sentences[0].trim() + '.'; 
                        }
                    });
                }
            });
            totalTextSize = calculateTextSize(headings);
        }

        if (totalTextSize > MAX_TEXT_SIZE && headings.h4) {
            delete headings.h4;
            totalTextSize = calculateTextSize(headings);
        }

        if (totalTextSize < MIN_TEXT_SIZE ) {
            console.log("Text size is below the minimum limit. No further reduction needed.");
        }

        return { headings };
    } catch (error) {
        console.error("Error extracting web data", error);
        return { headings: {} };
    }
};

export const formatForLLM = (structuredSummary: string) => {
    return structuredSummary
        .replace(/Published in.*|FollowPublished in.*|ListenShare.*/g, '') 
        .replace(/\n\s*\n/g, '\n') 
        .trim();
};


export const callLLM = async (structuredSummary: string, strict: boolean) => {
    const llm = createllm(DEFAULT_MODEL, SUMMARY_TEMP, SUMMARY_TOKEN);

    const SYSTEM_PROMPT = strict
        ? `
        You are an advanced summarization AI. Your task is to generate a highly accurate summary based strictly on the given data.  
        - Do **not** add any external knowledge, assumptions, or interpretations.  
        - Preserve key details, facts, and names as they appear in the input.  
        - Ensure clarity and conciseness while maintaining the meaning of the original text.  
        - Format the summary in a structured way if applicable (e.g., bullet points, headings).  
        `
        : `
        You are an intelligent summarization AI with knowledge enhancement capabilities.  
        - Your task is to generate a concise and informative summary, primarily based on the given data.  
        - You may **enhance** the summary by incorporating relevant general knowledge, but within a strict limit of 1000 tokens.  
        - Keep the summary clear, well-structured, and engaging while ensuring factual accuracy.  
        - If any data is missing, try to logically complete it using your pre-existing knowledge, but do not assume false information.  
        `;

    const response = await llm.invoke([
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: formatForLLM(structuredSummary) }
    ]);

    return response.content;
};

export const summarizer = async (webURL: string , strict : boolean) => {
    const { headings } = await extractWebData(webURL);

    const structuredSummary = Object.entries(headings)
        .flatMap(([tag, content]) => content.map((item) => `${tag.toUpperCase()}: ${item.heading} - ${item.reference}`))
        .join('\n');

    const llmResponse = await callLLM(structuredSummary, strict);
    return llmResponse; 
};  