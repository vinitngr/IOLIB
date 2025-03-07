import express from 'express';
import { addwebController, testController , addPdfController } from '../controllers/add.controller';
const router = express.Router();
import multer from 'multer';
import { getDocsById } from '../controllers/get.controller';

const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { 
        fileSize: 50 * 1024 * 1024 
    }
});

router.post("/upload", upload.fields([
    { name: "pdf", maxCount: 1 },
    { name: "image", maxCount: 1 }
]), addPdfController);


router.get('/test' , testController )
router.post('/web' , addwebController )

router.get("/docs/:docsId", getDocsById);
export default router;