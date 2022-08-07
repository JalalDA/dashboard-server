import Users from "../models/UserModel";

import { Request, Response } from "express";


export const getAllUsers = async (req: Request , res:Response)=>{
    try {
       const result =  await Users.findAll({
        attributes : ['id','display_name', 'email', 'phone', 'photo', 'birthday', 'delivery_adress', 'status']
       })
       console.log(result);
       
       res.status(200).json({
        msg : "Show all users",
        data : result
       })
    } catch (error) {
        console.log(error);
    }
}