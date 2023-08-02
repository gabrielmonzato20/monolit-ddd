import { Sequelize } from "sequelize-typescript";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";
import InvoiceProductModel from "../repository/invoice-product.model";
import InvoiceModel from "../repository/invoice.model";
import ProductModel from "../repository/product.model";
import InvoiceFacade, { FacadeProps } from "./invoice.facade";
import { InvoiceFacadeFindOutputDTO, InvoiceFacadeGenerateInputDTO, InvoiceFacadeGenerateOutputDTO } from "./invoice.facade.interface";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoceUsecase from "../usecase/find-invoce/find-invoce.usecase";
import GenerateInvoiceUseCase from "../usecase/generate-invoce/generate-invoce.usecase";

describe("InvoiceFacade test", () => {
    let sequelize: Sequelize;
  
    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
      await sequelize.addModels([InvoiceModel,ProductModel,InvoiceProductModel]);

      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();

    });
    // beforeAll(async () => {
    //     sequelize = new Sequelize({
    //       dialect: "sqlite",
    //       storage: ":memory:",
    //       logging: false,
    //       sync: { force: true },
    //     });
    //     await sequelize.addModels([InvoiceModel, ProductModel, InvoiceProductModel]);
    //     await sequelize.sync();
    //   });
    
    //   afterAll(async () => {
    //     await sequelize.close();
    //   });

    it("should generate a invoice thought facade", async () => {
        //const invoceFacade:InvoiceFacade = InvoiceFacadeFactory.create();
        const invoiceRepository :InvoiceRepository = new InvoiceRepository();
        const findInvoice:FindInvoceUsecase = new FindInvoceUsecase(invoiceRepository)
        const generateInvoice:GenerateInvoiceUseCase = new GenerateInvoiceUseCase(invoiceRepository)

        const props:FacadeProps = {
            findInvoice: findInvoice,
            generateInvoice: generateInvoice
        }
        const facade:InvoiceFacade = new InvoiceFacade(props);
        const input :InvoiceFacadeGenerateInputDTO = {
            name:"Pagamento curso",
            document:"000000000-0000000000000-00000000000",
            street: "Caledonia",
            number: "123",
            complement:"road",
            city:"gta",
            state:"on",
            zipCode:"5-6007078",
            items: [
                {
                id: "1",
                price:299.9,
                name:"test"
            },
            {
                id: "2",
                price:2939.9,
                name:"test1"
            },
            {
                id: "3",
                price:2399.9,
                name:"test2"
            }

            ]
    }
    await Promise.all(input.items.map(async(item)=>{
            await  ProductModel.create({
                id:item.id,
                name:item.name,
                price:item.price
            })
        }))
        const output:InvoiceFacadeGenerateOutputDTO = await facade.generate(input);
        expect(output.id).toBeDefined();
        expect(input.document).toBe(output.document);
        expect(input.name).toBe(output.name);
        expect(input.items.length).toBe(output.items.length);
        expect(input.city).toBe(output.city);
        expect(input.zipCode).toBe(output.zipCode);
        expect(input.complement).toBe(output.complement);
        expect(input.state).toBe(output.state);
        expect(input.number).toBe(output.number);
    })

    it("should find a invoice thought facade", async () => {
       // const invoceFacade:InvoiceFacade = InvoiceFacadeFactory.create();
       const invoiceRepository :InvoiceRepository = new InvoiceRepository();
       const findInvoice:FindInvoceUsecase = new FindInvoceUsecase(invoiceRepository)
       const generateInvoice:GenerateInvoiceUseCase = new GenerateInvoiceUseCase(invoiceRepository)

       const props:FacadeProps = {
           findInvoice: findInvoice,
           generateInvoice: generateInvoice
       }
       const facade:InvoiceFacade = new InvoiceFacade(props);
       const input :InvoiceFacadeGenerateInputDTO = {
            id:"1",
            name:"Pagamento curso",
            document:"000000000-0000000000000-00000000000",
            street: "Caledonia",
            number: "123",
            complement:"road",
            city:"gta",
            state:"on",
            zipCode:"5-6007078",
            items: [
                {
                id: "1",
                price:299.9,
                name:"test"
            },
            {
                id: "2",
                price:2939.9,
                name:"test1"
            },
            {
                id: "3",
                price:2399.9,
                name:"test2"
            }

            ]
    }
    // await Promise.all( input.items.map(async(item)=>{
    //         await    ProductModel.create({
    //             id:item.id,
    //             name:item.name,
    //             price:item.price
    //         })
    //     }))
        const invoceCreated:InvoiceModel= await InvoiceModel.create({
            id:input.id,
            name:input.name,
            document:input.document,
            street: input.street,
            number: input.number,
            complement:input.complement,
            city:input.city,
            state:input.state,
            zipCode:input.zipCode,
            items: input.items.map( (item)=>{
                return {
                    invoice_id: input.id,
                    product_id:item.id       
                }
            }),
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {include: [{model:InvoiceProductModel}],})
        const output:InvoiceFacadeFindOutputDTO = await facade.find({id:invoceCreated.id});
        expect(output.id).toBeDefined();
        expect(input.document).toBe(output.document);
        expect(input.name).toBe(output.name);
        expect(input.items.length).toBe(output.items.length);
        expect(input.city).toBe(output.address.city);
        expect(input.zipCode).toBe(output.address.zipCode);
        expect(input.complement).toBe(output.address.complement);
        expect(input.state).toBe(output.address.state);
        expect(input.number).toBe(output.address.number);
    })
})