import express, {Request, Response, NextFunction} from 'express'
import { userRegisterVal, options, userLoginVal } from '../utils/utils'
import { userInstance } from '../models/userModel'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import { valid } from 'joi';


const jwtsecret= process.env.JWT_SECRET as string

export const userSignUp = async function (req:Request|any, res:Response, next:NextFunction) {
    
    try {

        const idGenerator = uuidv4()

        
        const {fullName,email,userType, password, confirm_password } = req.body
        
      const validationResult = userRegisterVal.validate(req.body, options)

        if (validationResult.error) {
          res.status(400).json({Error: validationResult.error.details[0].message})
        }
        
        const passwordhash = await bcrypt.hash(password, 8)

        const user = await userInstance.findOne({
          where: {email:email}
        })
        
        if (!user) {
            const newUser = await userInstance.create({
                id: idGenerator,
               ...req.body,
                password: passwordhash
               
            })

            const User = await userInstance.findOne({
                where: {email:email}
            }) as unknown as {[key:string]:string}
         
            const { id } = User
            
         const token = jwt.sign({id},jwtsecret,{expiresIn:"30mins"})


            res.status(200).json({
                msg: "New user created",
                newUser,
                token
            })
        } else {
            res.status(301).json({msg: "User already exist, please login"})
        }  
    } catch (error) {
    res.status(400).json({Error: "cant create admin"})
    }
} 



export const userLogin = async function (req: Request, res: Response) {
  try {
    const { email, password } = req.body
    //validate user input
    const validationResult = userLoginVal.validate(req.body, options)
    if (validationResult.error) {
        res.status(400).json({Error: validationResult.error.details[0].message})
    }
     //generate token for login 
    
    const User = await userInstance.findOne({
        where:{email:email}
    }) as unknown as {[key:string]:string}
    
    const {id} = User
    
      const token = jwt.sign({ id }, jwtsecret, { expiresIn: '2d' })
      const validUser = await bcrypt.compare(password, User.password)
    
      if (validUser) { 
          res.status(201).json({
              msg: "Login successful",
              token,
              User
          })  
      } else {
          
          res.status(400).json({Error: "invalid email/password"})
      }
      
  } catch (error) {
      console.log(error)
       res.status(500).json({Error: 'Internal error'})
  } 
}