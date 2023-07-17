import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "./product.entity";
import Address from "./value-objects/adress";
type InvoceProps ={
    id?:Id
    name: string
    document: string
    address: Address 
    items: Product[] 
    createdAt?: Date
    updatedAt?: Date
}
export default class Invonce extends BaseEntity implements AggregateRoot {
    name: string
    document: string
    address: Address // value object
    items: Product[] // Product entity
    constructor(invoce:InvoceProps){
        super(invoce.id)
        this.name = invoce.name
        this.address = invoce.address
        this.items = invoce.items
        this.document = invoce.document
        this.validate()
    }
    validate():void {
        let sum = this.items.reduce((total,item) =>{
            return total += item.price
        },0)
        if (sum <= 0) {
            throw new Error("Amount must be greater than 0");
          }
    }

}