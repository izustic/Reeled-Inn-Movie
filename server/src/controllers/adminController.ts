import express, { Request, Response, NextFunction } from 'express';
import {v4 as uuidv4} from 'uuid' 
import { adminRegisterVal, options , adminLoginVal} from '../utils/utils';
import { adminInstance } from '../models/adminModel';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { valid } from 'joi';

const jwtsecret = process.env.JWT_SECRET as string

export const adminSignUp =async function(req:Request, res:Response, next:NextFunction) {
    try {
     const idGenerator = uuidv4()
     const {name,email,password,confirm_password} = req.body

// validate admin input
  const validationResult = adminRegisterVal.validate(req.body, options)
  
     if (validationResult.error) {
         res.status(400).json({Error: validationResult.error.details[0].message})
     }

   //Generate salt(means to has password)
   const passwordhash = await bcrypt.hash(password, 8)
     
     //check if the admin is existing 
     const admin = await adminInstance.findOne({
         where: {email:email}
     })
     if (!admin) {
         const newAdmin = await adminInstance.create({
             id: idGenerator,
             name,
             email,
             password: passwordhash
         })
         //after creating new admin attach to it a token
         const Admin = await adminInstance.findOne({
             where:{email:email} 
         }) as unknown as {[key:string]:string}

         const { id } = Admin
         
         const token = jwt.sign({id},jwtsecret,{expiresIn:"30mins"})

         res.status(201).json({
             msg: 'new admin created successfully',
             newAdmin,
             token
         })
     } else {
         res.status(301).send('existing admin, please login')
     }
 } catch (error) {
    res.status(400).json({Error: "cant create admin"})
 }
}


export const adminLogin = async function (req: Request, res: Response) {
  try {
    const { email, password } = req.body
    //validate admin input
    const validationResult = adminLoginVal.validate(req.body, options)
    if (validationResult.error) {
        res.status(400).json({Error: validationResult.error.details[0].message})
    }
     //generate token for login 
    
    const admin = await adminInstance.findOne({
        where:{email:email}
    }) as unknown as {[key:string]:string}
    
    const {id} = admin
    
      const token = jwt.sign({ id }, jwtsecret, { expiresIn: '2d' })
      const validAdmin = await bcrypt.compare(password, admin.password)
    
      if (validAdmin) { 
          res.status(201).json({
              msg: "Login successful",
              token,
              admin
          })  
      } else {
          
          res.status(400).json({Error: "invalid email/password"})
      }
      
  } catch (error) {
      console.log(error)
       res.status(500).json({Error: 'Internal error'})
  } 
}