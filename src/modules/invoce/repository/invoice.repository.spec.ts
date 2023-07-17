import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.model";
import Product from "../domain/product.entity";
import Invonce from "../domain/invoce.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoceRepository from "./invoice.repository";
import InvoiceProductModel from "./invoice-product.model";
import InvoiceModel from "./invoice.model";

describe("InvoiceRepository test", () => {
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
  
    it("should generate a invoice", async () => {
        const invoceRepository:InvoceRepository = new InvoceRepository();
        const invoceToGenerate:Invonce = new Invonce({
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
                id: new Id("3"),
                price:2399.9,
                name:"test2"
            }),
        
        ]

        });
        invoceToGenerate.items.map(async(item)=>{
            ProductModel.create({
                id:item.id.id,
                name:item.name,
                price:item.price
            })
        })
        await invoceRepository.generate(invoceToGenerate);
        const invoceDb = await InvoiceModel.findOne({where:{id:invoceToGenerate.id.id},include: {model:InvoiceProductModel}        })
        // console.log(invoceDb)
        expect(invoceDb.id).toBe(invoceToGenerate.id.id);
        expect(invoceDb.document).toBe(invoceToGenerate.document);
        expect(invoceDb.name).toBe(invoceToGenerate.name);
        expect(invoceDb.items.length).toBe(invoceToGenerate.items.length);
        expect(invoceDb.city).toBe(invoceToGenerate.address.city);
        expect(invoceDb.zipCode).toBe(invoceToGenerate.address.zipCode);
        expect(invoceDb.complement).toBe(invoceToGenerate.address.complement);
        expect(invoceDb.state).toBe(invoceToGenerate.address.state);
        expect(invoceDb.number).toBe(invoceToGenerate.address.number);


    })

    
    it("should find a invoice", async () => {
        const invoceRepository:InvoceRepository = new InvoceRepository();
        const invoce:Invonce = new Invonce({
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
                id: new Id("3"),
                price:2399.9,
                name:"test2"
            }),
        
        ]

        });
        invoce.items.map(async(item)=>{
            await ProductModel.create({
                id:item.id.id,
                name:item.name,
                price:item.price
            })
        })
        const invoceCreated:InvoiceModel= await InvoiceModel.create({
            id:invoce.id.id,
            name:invoce.name,
            document:invoce.document,
            street: invoce.address.street,
            number: invoce.address.number,
            complement:invoce.address.complement,
            city:invoce.address.city,
            state:invoce.address.state,
            zipCode:invoce.address.zipCode,
            items: invoce.items.map( (item)=>{
                return {
                    invoice_id: invoce.id.id,
                    product_id:item.id.id       
                }
            }),
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {include: [{model:InvoiceProductModel}],})

        const invoceFind = await invoceRepository.find(invoce.id.id);
        // console.log(invoceDb)
        expect(invoceFind.id.id).toBe(invoce.id.id);
        expect(invoceFind.document).toBe(invoce.document);
        expect(invoceFind.name).toBe(invoce.name);
        expect(invoceFind.items.length).toBe(invoce.items.length);
        expect(invoceFind.address.city).toBe(invoce.address.city);
        expect(invoceFind.address.zipCode).toBe(invoce.address.zipCode);
        expect(invoceFind.address.complement).toBe(invoce.address.complement);
        expect(invoceFind.address.state).toBe(invoce.address.state);
        expect(invoceFind.address.number).toBe(invoce.address.number);


    })
})