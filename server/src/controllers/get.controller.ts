import { Request, Response } from "express";
import DocsModel from "../models/Docs";

export const getDocsById = async (req: any , res: any) => {
    try {
        const { docsId } = req.params;
        const doc = await DocsModel.findOne({ docsId });

        if (!doc) {
            return res.status(404).json({ message: "Document not found" });
        }

        res.status(200).json(doc);
    } catch (error) {
        console.error("Error fetching document:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getAllDocs = async (_req: any, res: any) => {
    try {
        const docs = await DocsModel.find({});
        res.status(200).json({docs : docs , length : docs.length});
    } catch (error) {
        console.error("Error fetching documents:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};