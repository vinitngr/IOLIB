import mongoose from 'mongoose';
import { DocsData } from '../types/web.type';

const { Schema } = mongoose;

export interface IDocsData extends DocsData {
    summary: string;
}

const DocsSchema = new Schema<IDocsData>({
    type: { type: String, required: true, enum: ['pdf', 'web'] },
    docsId: { type: String, required: true, unique: true },
    createdAt: { type: String, required: true },
    aboutPdf: {
        author: String,
        category: String,
        language: String,
        description: String,
        url: String
    },
    aboutWeb: {
        webURL: String,
        title: String,
        category: String,
        language: String,
        description: String,
    },
    RAG: {
        retrival: Number,
        tokenPR: Number,
        chunkOverlap: Number,
        strict: Boolean,
    },
    summary: { type: String },
});


const DocsModel = mongoose.model('DocsData', DocsSchema);

export default DocsModel;
