export const processContentFXN = (content : string) => {
    return content
        .replace(/\s+/g, ' ') 
        .replace(/[^\w\s.,!?'-]/g, '') 
        .trim(); 
}

