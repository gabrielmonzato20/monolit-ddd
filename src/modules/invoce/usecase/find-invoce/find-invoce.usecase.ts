import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import { InvoceGateway } from "../../gateway/invoce.gateway";
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from "./find-invoce.dto";

export default class FindInvoceUsecase  implements UseCaseInterface {
    private _invoceRepository: InvoceGateway
    constructor(invoceRepository:InvoceGateway ){
        this._invoceRepository = invoceRepository
    }
    async execute(input:FindInvoiceUseCaseInputDTO) : Promise<FindInvoiceUseCaseOutputDTO>{
     let invoce =  await this._invoceRepository.find(input.id)
     return {
        id : invoce.id.id,
        name: invoce.name,
        document: invoce.document,
        address: {
          street: invoce.address.street,
          number: invoce.address.number,
          complement: invoce.address.complement,
          city: invoce.address.city,
          state: invoce.address.state,
          zipCode: invoce.address.zipCode,
        },
        items: invoce.items.map((item)=>{
            return{
                id:item.id.id,
                name:item.name,
                price:item.price
            }
        }),
        total: invoce.items.reduce((tot,item)=>{return tot+=item.price},0),
        createdAt: invoce.createdAt,
    }
}
}