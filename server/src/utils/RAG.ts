export const processContentFXN = (content) => {
    return content
        .replace(/\s+/g, ' ') 
        .replace(/[^\w\s.,!?'-]/g, '') 
        .trim(); 
}
