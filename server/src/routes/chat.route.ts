import express from 'express';
import { chatHandler, chatTest, docsSummary, llmHandler } from '../controllers/chat.controller';

const router = express.Router();

router.get('/test', chatTest); 
router.post('/:id/llm', llmHandler); 
router.get('/:id/summary', docsSummary );
// router.get('/:id', chatHandler);

export default router;
