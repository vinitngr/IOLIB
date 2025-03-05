import express from 'express';
import { addwebController, testController , addPdfController } from '../controllers/add.controller';
const router = express.Router();
import multer from 'multer';

const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { 
        fileSize: 10 * 1024 * 1024
    }
});

router.get('/test' , testController )
router.post('/web' , addwebController )
router.post("/upload-pdf", upload.single("pdf"), addPdfController)
// router.post("/upload-pdf", (req, res) => {
//     upload.single("pdf")(req, res, (err) => {
//         addPdfController(req, res);
//     });
// });
export default router;