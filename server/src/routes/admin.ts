import express, {Request,Response,NextFunction} from 'express';
import { adminLogin, adminSignUp } from '../controllers/adminController';
const router = express.Router();

/* GET users listing. */
router.post('/signup', adminSignUp);
router.post('/login', adminLogin);

export default router;
