import express from 'express';
const router = express.Router();
import { getAllDocs, getDocsById } from '../controllers/get.controller';
import { protectedRoutes } from '../middleware/protectedRoutes';

router.get("/docs/:docsId" , protectedRoutes , getDocsById);
router.get("/docs", getAllDocs);
export default router;