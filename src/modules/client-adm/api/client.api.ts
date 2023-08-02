import express, { Router,Request,Response } from "express";
import ClientAdmFacadeInterface from "../facade/client-adm.facade.interface";
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory";
import { AddClientInputDto } from "../usecase/add-client/add-client.usecase.dto";

export const clientRoute:Router = express.Router()

const facade :ClientAdmFacadeInterface =  ClientAdmFacadeFactory.create();
clientRoute.post("/",async (req:Request,resp:Response) => {
    try {
    const input: AddClientInputDto = {
        id: req.body.id || null,
        name: req.body.name,
        email:req.body.email,
        address:req.body.address
    }
    const output = await facade.add(input);
    resp.send(input);
    }catch(err){
        resp.status(500).send(err)
    }
    
})