import InvoiceFacade, { FacadeProps } from "../facade/invoice.facade";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoceUsecase from "../usecase/find-invoce/find-invoce.usecase";
import GenerateInvoiceUseCase from "../usecase/generate-invoce/generate-invoce.usecase";

export default class InvoiceFacadeFactory {
    static create():InvoiceFacade{
        const invoiceRepository :InvoiceRepository = new InvoiceRepository();
        const findInvoice:FindInvoceUsecase = new FindInvoceUsecase(invoiceRepository)
        const generateInvoice:GenerateInvoiceUseCase = new GenerateInvoiceUseCase(invoiceRepository)

        const props:FacadeProps = {
            findInvoice: findInvoice,
            generateInvoice: generateInvoice
        }
        const facade:InvoiceFacade = new InvoiceFacade(props);
        return facade
    }
}