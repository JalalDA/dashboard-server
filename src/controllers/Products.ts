import Products from "../models/ProductModel";
import { Request, Response } from "express";

export const addProduct = async (req:Request, res:Response)=>{
    try {
        const {file = null} = req
        const images = file?.path
        const {product_name, selling_price, stock, supplier, delivery_info, status, admin_id, capital_price, description} = req.body
        const result = await Products.create({
            product_name,
            selling_price,
            description,
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
        const {id} = req.params
        const images = file?.path
        const {product_name, selling_price, stock, supplier, delivery_info, status, admin_id, capital_price, description} = req.body
        const data = await Products.findOne(
            {where :{id : id}}
        )
        
        console.log(data)
        if(!data){
            const item = await Products.create({product_name})
            return res.status(200).json({item})
        }
        console.log(product_name)
        const item = await Products.update(
            {
                product_name : product_name, 
                selling_price : selling_price, 
                description : description,
                stock,
                supplier,
                delivery_info,
                status,
                admin_id,
                capital_price,
                images : images
            },{where : {id : id}})
        console.log(item)
        console.log(req.body)
        return res.status(200).json({msg : "Update success", item})
        // if(data){
        //     await Products.update(
        //         {
        //             product_name,
        //             selling_price,
        //             stock,
        //             supplier,
        //             delivery_info,
        //             images,
        //             status,
        //             admin_id,
        //             capital_price
        //         },
        //         {
        //             returning : product_name,
        //             where : {
        //                 id : id
        //             }
        //         }
        //     )
        // }else{
        //     return res.status(400).json({
        //         msg : `There is no data with id ${id}`
        //     })
        // }
        
        res.status(200).json({
            msg : `Success update product with id = ${id}`,
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
        console.log(result)
        res.status(200).json({
            msg : `Success delete product with id = ${id}`
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error
        })
    }
}

export const getProductById = async (req:Request, res:Response)=>{
    try {
        const {id} = req.params
        const response = await Products.findOne({
            where : {
                id
            }
        })
        return res.status(200).json(response)
    } catch (error) {
        console.log(error);
        return res.status(400).json(error)
    }
}