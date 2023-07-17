import Id from "../../../@shared/domain/value-object/id.value-object"
import Invonce from "../../domain/invoce.entity"
import Product from "../../domain/product.entity"
import { InvoceGateway } from "../../gateway/invoce.gateway";
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from "./find-invoce.dto";
import FindInvoceUsecase from "./find-invoce.usecase";

const invoceToFind:Invonce = new Invonce({
            id: new Id("1"),
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
                find: jest.fn().mockReturnValue(Promise.resolve(invoceToFind)),
                generate: jest.fn()
                
            };
          };

describe("Find invoce usecase unit test", () => {
    it("should find a invoce", async () => {
    const invoceRepository = MockRepository();
    const usecase = new FindInvoceUsecase(invoceRepository);
    const input :FindInvoiceUseCaseInputDTO = {
            id: "1"
    }
    const output: FindInvoiceUseCaseOutputDTO = await usecase.execute(input);
    expect(output.id).toBeDefined();
    expect(invoceRepository.find).toHaveBeenCalled();
    expect(output.document).toBe(invoceToFind.document);
    expect(output.name).toBe(invoceToFind.name);
    expect(output.items.length).toBe(3);
    expect(output.total).toBe(invoceToFind.items.reduce((cont,item)=>{return cont+=item.price},0));
    })

    

})