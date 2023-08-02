import express,{ Request,Response, Router } from "express";
import ProductAdmFacadeFactory from "../factory/facade.factory";
import ProductAdmFacadeInterface, { AddProductFacadeInputDto } from "../facade/product-adm.facade.interface";
import { AddProductOutputDto } from "../usecase/add-product/add-product.dto";


export const productRoute:Router = express.Router()

const facade :ProductAdmFacadeInterface =  ProductAdmFacadeFactory.create();
productRoute.post("/",async (req:Request,resp:Response) => {
    try {
    const input: AddProductFacadeInputDto = {
        id: req.body.id || null,
        name: req.body.name,
        description: req.body.description,
        purchasePrice: req.body.purchasePrice,
        stock: req.body.stock,
    }
    const output = await facade.addProduct(input);
    resp.send(input);
    }catch(err){
        resp.status(500).send(err)
    }
    
})
