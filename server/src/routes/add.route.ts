import express from 'express';
import { addwebController, testController , addPdfController } from '../controllers/add.controller';
const router = express.Router();
import multer from 'multer';
import { protectedRoutes } from '../middleware/protectedRoutes';

const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { 
        fileSize: 50 * 1024 * 1024 
    }
});

router.get('/test' , protectedRoutes , testController )

router.post("/upload", protectedRoutes, upload.fields([
    { name: "pdf", maxCount: 1 },
    { name: "image", maxCount: 1 }
]), addPdfController);

router.post('/web' , protectedRoutes , addwebController )

export default router;