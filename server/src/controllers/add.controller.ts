import {  RAGworker, saveToMONGO } from "../service/add.service";
export const testController = (req : any , res : any) =>{
    res.status(200).json({
        message : "test route check"
    })
}

export const addwebController = async (req: any, res: any) => {
    try {
        const addData = req.body;

        if (!addData.webURL) {
            return res.status(400).json({ error: "webURL is required" });
        }


        const randomUUID: string = crypto.randomUUID();
        const time: string = new Date().toISOString();

        await saveToMONGO({
            ...addData,
            WebId: randomUUID,
            createAt: time
        });

        await RAGworker({
            type: 'web',
            webURL: addData.webURL,
            webId : randomUUID ,
            ...(addData.RAG && { RAG: addData.RAG })
        });
        

        res.status(200).json({
            type: 'web',
            webURL: addData.webURL,
            mongoSave: true ,
            RAGSave: true ,
            WebId: randomUUID,
            createAt: time,
        });

    } catch (error) {
        console.error("Error in Saving Data", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
    //TODO
    //TODO:HACKATHON :ZOD VALIDATION
    //TODO check url valid or not

};


export const addPdfController = async ( req : any , res : any ) =>{

}