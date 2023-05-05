import express,{Request, Response, NextFunction } from "express";
import { organisationCreate } from "../controllers/organisationController";
import { auth } from "../middleware/auth";

const router = express.Router();

/* GET home page. */
router.post('/create',auth, organisationCreate);

export default router;
