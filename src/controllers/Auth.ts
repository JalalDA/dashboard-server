import Users from "../models/UserModel";
import { Request, Response  } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req:Request, res:Response)=>{
    const {display_name, email, password} = req.body
    const salt= await bcrypt.genSalt()
    const hashPassword = bcrypt.hash(password, salt)
    try {
        await Users.create({
            display_name,
            email,
            password : hashPassword
        })
        res.status(200).json({
            msg : "Register success, please check your email"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg : "Register failed", 
            error
        })
    }
}

export const login = async (req:Request, res:Response)=>{
    try {
        const {email, password} = req.body
        const result = await Users.findAll({
            where : {email : email}
        })
        if(!result) return res.status(404).json("Email is not registered")
        const dbPass = result[0].getDataValue('password')
        if(!dbPass) return res.status(404).json("You don't have any password yet")
        const display_name = result[0].getDataValue('email')
        const photo = result[0].getDataValue('id')
        const id = result[0].getDataValue('id')
        const role = result[0].getDataValue('role')
        const match = bcrypt.compare(password, dbPass)
        if(!match) return res.status(401).json("Wrong email or password")
        const accessToken = jwt.sign({email, display_name, id, role, photo}, `${process.env.ACCESS_TOKEN}`, {
            expiresIn : '300s'
        })
        res.status(200).json({
            msg : "Login success",
            token : accessToken
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg : "Login failed",
            error
        })
    }
}