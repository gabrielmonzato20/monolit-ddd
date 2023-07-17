import FindInvoceUsecase from "../usecase/find-invoce/find-invoce.usecase";
import GenerateInvoiceUseCase from "../usecase/generate-invoce/generate-invoce.usecase";
import InvoiceFacadeInterface, { InvoiceFacadeFindInputDTO, InvoiceFacadeFindOutputDTO, InvoiceFacadeGenerateInputDTO, InvoiceFacadeGenerateOutputDTO } from "./invoice.facade.interface";

export interface FacadeProps {
    findInvoice:FindInvoceUsecase,
    generateInvoice:GenerateInvoiceUseCase
}
export default class InvoiceFacade implements InvoiceFacadeInterface{
    private _findUseCase:FindInvoceUsecase;
    private _generateUseCase:GenerateInvoiceUseCase;
    constructor(private props:FacadeProps){
        this._findUseCase = props.findInvoice;
        this._generateUseCase = props.generateInvoice;
    }
    find(input: InvoiceFacadeFindInputDTO): Promise<InvoiceFacadeFindOutputDTO> {
        return  this._findUseCase.execute(input);
    }
    generate(input: InvoiceFacadeGenerateInputDTO): Promise<InvoiceFacadeGenerateOutputDTO> {
        return  this._generateUseCase.execute(input);
    }
    
}