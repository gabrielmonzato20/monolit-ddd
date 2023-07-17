import Id from "../../../@shared/domain/value-object/id.value-object"
import Invonce from "../../domain/invoce.entity"
import Product from "../../domain/product.entity"
import { InvoceGateway } from "../../gateway/invoce.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoce.dto";
import GenerateInvoiceUseCase from "./generate-invoce.usecase";

const invoceToGenerate:Invonce = new Invonce({
            name:"Pagamento curso",
            document:"000000000-0000000000000-00000000000",
            address:{
                street: "Caledonia",
                number: "123",
                complement:"road",
                city:"gta",
                state:"on",
                zipCode:"5-6007078"
            },
            items: [new Product({
                id: new Id("1"),
                price:299.9,
                name:"test"
            }),
            new Product({
                id: new Id("2"),
                price:2939.9,
                name:"test1"
            }),
            new Product({
                id: new Id("2"),
                price:2399.9,
                name:"test2"
            }),
        
        ]

        })
        const MockRepository = () => {
            return {
                find: jest.fn().mockReturnValue(Promise.resolve(invoceToGenerate)),
                generate: jest.fn()
                
            };
          };

describe("Generate invoce usecase unit test", () => {
    it("should generate a invoce", async () => {
        const invoceRepository = MockRepository();
    const usecase = new GenerateInvoiceUseCase(invoceRepository);
    const input :GenerateInvoiceUseCaseInputDto = {
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
    const output: GenerateInvoiceUseCaseOutputDto = await usecase.execute(input);
    expect(output.id).toBeDefined();
    expect(invoceRepository.generate).toHaveBeenCalled();
    expect(output.document).toBe(invoceToGenerate.document);
    expect(output.name).toBe(invoceToGenerate.name);
    expect(output.items.length).toBe(3);
    expect(output.total).toBe(invoceToGenerate.items.reduce((cont,item)=>{return cont+=item.price},0));
    })

    
    it("should thorw a error when generate a invoce", async () => {
        const invoceRepository = MockRepository();
    const usecase = new GenerateInvoiceUseCase(invoceRepository);
    const input :GenerateInvoiceUseCaseInputDto = {
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
                price:0,
                name:"test"
            },
            {
                id: "2",
                price:-100,
                name:"test1"
            },
            {
                id: "3",
                price:-2399.9,
                name:"test2"
            }

            ]
    }
   // const output: GenerateInvoiceUseCaseOutputDto =  await usecase.execute(input);
    expect( usecase.execute(input)).rejects.toThrowError("Amount must be greater than 0");

    })
})
