import express from 'express';
import { addwebController, testController , addPdfController } from '../controllers/add.controller';
const router = express.Router();
import multer from 'multer';

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
// router.post("/upload-pdf", (req, res) => {
//     upload.single("pdf")(req, res, (err) => {
//         addPdfController(req, res);
//     });
// });
export default router;