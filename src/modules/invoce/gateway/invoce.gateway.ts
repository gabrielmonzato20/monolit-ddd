import Invonce from "../domain/invoce.entity";

export interface InvoceGateway {
    find(id:string):Promise<Invonce>;
    generate(invoce:Invonce):Promise<void>
}