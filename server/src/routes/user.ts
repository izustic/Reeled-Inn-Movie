import express, {Request,Response,NextFunction} from 'express';
import { userLogin, userSignUp } from '../controllers/userController';
const router = express.Router();

/* GET users listing. */
router.post('/signup', userSignUp);
router.post('/login', userLogin);

export default router;
