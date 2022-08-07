import Products from "../models/ProductModel";
import { Request, Response } from "express";

export const addProduct = async (req:Request, res:Response)=>{
    try {
        const {file = null} = req
        const images = file?.path
        const {product_name, selling_price, stock, supplier, delivery_info, status, admin_id, capital_price} = req.body
        const result = await Products.create({
            product_name,
            selling_price,
            stock,
            supplier,
            images,
            delivery_info,
            status,
            admin_id,
            capital_price
        }, {returning : true})
        res.status(200).json({
            msg : `Succes add ${product_name.toUpperCase()}`,
            data : result
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error
        })
    }
}

export const getAllProduct = async (req:Request, res:Response)=>{
    try {
        const result = await Products.findAll({
            where : {
                deleted_at : null
            }
        })
        console.log(result)
        res.status(200).json({
            data : result
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const updateProduct = async (req:Request, res:Response) => {
    try {
        const {file = null} = req
        const images = file?.path
        const {id, product_name, selling_price, stock, supplier, delivery_info, status, admin_id, capital_price} = req.body
        const result = await Products.update(
            {
                product_name,
                selling_price,
                stock,
                supplier,
                delivery_info,
                images,
                status,
                admin_id,
                capital_price
            },
            {
                returning : true,
                where : {
                    id : id
                }
            }
        )
        res.status(200).json({
            msg : `Success update product with id = ${id}`,
            data : result
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error
        })
        
    }
}

export const deleteProduct = async (req:Request, res:Response)=>{
    try {
        const {id} = req.params
        const result = await Products.update({
            deleted_at : true
        }, {
            returning : true,
            where : {
                id : id
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error
        })
    }
}