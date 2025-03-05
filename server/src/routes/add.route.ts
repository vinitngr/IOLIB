import express from 'express';
import { addwebController, testController , addPdfController } from '../controllers/add.controller';
const router = express.Router();

router.get('/test' , testController )
router.post('/web' , addwebController )
router.post('/pdf' , addPdfController ) 

export default router;