import express from 'express';
const router = express.Router();
import { getAllDocs, getDocsById } from '../controllers/get.controller';

router.get("/docs/:docsId", getDocsById);
router.get("/docs", getAllDocs);
export default router;