import express from "express";
 
import { 
    getAllNews,
    createNews,
    getNewsById,
    
} from "../controller/News";
 
const router = express.Router();
 
router.get('/', getAllNews);
router.get('/:id', getNewsById);
router.post('/', createNews);

 
export default router;