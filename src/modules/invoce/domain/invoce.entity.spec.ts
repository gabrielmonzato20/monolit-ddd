import Id from "../../@shared/domain/value-object/id.value-object"
import Invonce from "./invoce.entity"
import Product from "./product.entity"

describe(" invoce entity unit test", () => {
    it("should create a invoce", async () => {
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
                id: new Id("3"),
                price:2399.9,
                name:"test2"
            }),
        
        ]

        })

        expect(invoceToGenerate.id).toBeDefined();
        expect(invoceToGenerate.document).toBe("000000000-0000000000000-00000000000");
        expect(invoceToGenerate.name).toBe("Pagamento curso");
        expect(invoceToGenerate.items[0].id.id).toBe("1");
        expect(invoceToGenerate.items[0].price).toBe(299.9);
        expect(invoceToGenerate.items[0].name).toBe("test");
        expect(invoceToGenerate.items[1].id.id).toBe("2");
        expect(invoceToGenerate.items[1].price).toBe(2939.9);
        expect(invoceToGenerate.items[1].name).toBe("test1");
        expect(invoceToGenerate.items[2].id.id).toBe("3");
        expect(invoceToGenerate.items[2].price).toBe(2399.9);
        expect(invoceToGenerate.items[2].name).toBe("test2");
        expect(invoceToGenerate.address.city).toBe("gta");
        expect(invoceToGenerate.address.complement).toBe("road");
        expect(invoceToGenerate.address.street).toBe("Caledonia");
        expect(invoceToGenerate.address.number).toBe("123");
        expect(invoceToGenerate.address.state).toBe("on");
        expect(invoceToGenerate.address.zipCode).toBe("5-6007078");



    })

    it("should not create a invoce", async () => {
       

        expect(()=>{

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
                    price:-299.9,
                    name:"test"
                }),
                new Product({
                    id: new Id("2"),
                    price:-2939.9,
                    name:"test1"
                }),
                new Product({
                    id: new Id("3"),
                    price:-2399.9,
                    name:"test2"
                }),
            
            ]
    
            })
        }).toThrowError("Amount must be greater than 0");

    })
})