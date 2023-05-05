 import express, {Request,Response,NextFunction} from 'express';
import { createOrganisationVal, options } from '../utils/utils';
import { organisationInstance } from '../models/organisationModel';
import { v4 as UUIDV4 } from 'uuid';


export const organisationCreate =async function (req: Request | any, res: Response, next: NextFunction) {
  try {
    
    const idGenerator = UUIDV4()
     const verified =  req.Admin
       const { name ,address , description ,website} = req.body

  // valiate user input 
  const validationResult = createOrganisationVal.validate(req.body, options)

  if (validationResult.error) {
   res.status(400).json({Error: validationResult.error.details[0].message})
  }
  
    const newOrganisation = await organisationInstance.create({
    id: idGenerator,
      name,
      address,
      description,
    website,
    adminID: verified.id
  })
   
  return res.status(201).json({
    msg: "New Organisation created",
    newOrganisation
   })
  } catch (error) {
    console.log(error)
  }
}