import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import ValueObject from "../../@shared/domain/value-object/value-object.interface";
type ProductProps = {
id?: Id;
name: string
price: number
}
export default class Product extends BaseEntity implements ValueObject{
name: string
price: number

constructor(product:ProductProps){
super(product.id)
this.name = product.name
this.price = product.price

}
}