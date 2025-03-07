import express from 'express';
import { chatHandler, chatTest, docsSummary, llmHandler } from '../controllers/chat.controller';
import { protectedRoutes } from '../middleware/protectedRoutes';

const router = express.Router();

router.get('/test', protectedRoutes ,chatTest); 
router.post('/:id/llm',protectedRoutes, llmHandler); 
router.get('/:id/summary', protectedRoutes , docsSummary );

export default router;
