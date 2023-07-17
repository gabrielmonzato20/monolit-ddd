import Id from "../../@shared/domain/value-object/id.value-object";
import Invonce from "../domain/invoce.entity";
import Product from "../domain/product.entity";
import { InvoceGateway } from "../gateway/invoce.gateway";
import InvoiceProductModel from "./invoice-product.model";
import InvoiceModel from "./invoice.model";
import ProductModel from "./product.model";

export default class InvoiceRepository implements InvoceGateway{
    async find(id: string): Promise<Invonce> {
        const invoce: InvoiceModel =await  InvoiceModel.findOne({
            where: {id},
            include: [{model:InvoiceProductModel,include: [ProductModel]}],
        },)
        return new Invonce({
            id: new Id(invoce.id),
            name:invoce.name,
            document:invoce.document,
            address:{
                street: invoce.street,
                number: invoce.number,
                complement:invoce.complement,
                city:invoce.city,
                state:invoce.state,
                zipCode:invoce.zipCode
            },
            items: invoce.items.map((item)=>{
                return new Product({
                    id:new Id(item.product.id),
                    price: item.product.price,
                    name:item.product.name
                })
            })

        })
    }
    async generate(invoce: Invonce): Promise<void> {
        const invoceCreated:InvoiceModel= await InvoiceModel.create({
            id:invoce.id.id,
            name:invoce.name,
            document:invoce.document,
            street: invoce.address.street,
            number: invoce.address.number,
            complement:invoce.address.complement,
            city:invoce.address.city,
            state:invoce.address.state,
            zipCode:invoce.address.zipCode,
            items: invoce.items.map( (item)=>{
                return {
                    invoice_id: invoce.id.id,
                    product_id:item.id.id       
                }
            }),
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {include: [{model:InvoiceProductModel}],})
        // invoce.items.map(async (item)=>{
        //     await InvoiceProductModel.create({
        //         invoice_id: invoceCreated.id,
        //         product_id:item.id
                                
        //     })
        // })

    }
    
}



