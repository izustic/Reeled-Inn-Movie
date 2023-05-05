import  express, { Request, Response,  NextFunction } from "express";
import jwt from "jsonwebtoken";
import { adminInstance } from "../models/adminModel";

const jwtsecret = process.env.JWT_SECRET as string

export const auth = async function (req: Request|any, res: Response, next: NextFunction) {
    try {
        const authorisation = req.headers.authorization

    if (!authorisation) {
       return res.status(401).json({Error: "Hey there!, you need to log in"})
    }
        const token = authorisation.slice(7, authorisation.length);

        const verified = jwt.verify(token, jwtsecret);

    if (!verified) {
       return res.status(401).json({Error: "Hey there!, why are you trying to be a criminal"})
    }
        const { id } = verified as { [key: string]: string }
        
        const Admin = await adminInstance.findOne({
            where: {id}
        })

        if (!Admin) {
           return  res.status(401).json({Error: "Hey there!, you need to be an Admin"})
        }

        req.Admin = verified;
        next()
    
    } catch (error) {
        return res.status(401).json({Error: "Hey there!,kindly sign up"})
    }
}
