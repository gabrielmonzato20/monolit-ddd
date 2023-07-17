import Id from "../../../@shared/domain/value-object/id.value-object"
import UseCaseInterface from "../../../@shared/usecase/use-case.interface"
import Invonce from "../../domain/invoce.entity"
import Product from "../../domain/product.entity"
import { InvoceGateway } from "../../gateway/invoce.gateway"
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoce.dto"

export default class GenerateInvoiceUseCase  implements UseCaseInterface{
    private _InvoceRepository:InvoceGateway
    constructor(invoceRepository : InvoceGateway){
        this._InvoceRepository = invoceRepository
    }
    async execute(input:GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto>{
        let props = {
            id: new Id(),
            name: input.name,
            document: input.document,
            address: {
                street: input.street,
                number: input.number,
                complement: input.complement,
                city: input.city,
                state: input.state,
                zipCode: input.zipCode,
            },
            items: input.items.map((item) =>{
                return new Product({
                    id: new Id(item.id),
                    name:item.name,
                    price:item.price
                });
            }) ,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        const invoce : Invonce = new Invonce(props);
        this._InvoceRepository.generate(invoce);
        return {
            id: invoce.id.id,
            name: invoce.name,
            document: invoce.document,
            street: invoce.address.street,
            number: invoce.address.number,
            complement: invoce.address.complement,
            city: invoce.address.city,
            state: invoce.address.state,
            zipCode: invoce.address.zipCode,
            items: invoce.items.map((item)=>{
                return{
                    id:item.id.id,
                    name:item.name,
                    price:item.price
                }
            }),
            total: invoce.items.reduce((tot,item)=>{return tot+=item.price},0),
          }
        } 
    

    }


