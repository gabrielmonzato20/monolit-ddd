import ValueObject from "../../../@shared/domain/value-object/value-object.interface";
type AdressProps = {
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
}
export default class Address implements ValueObject{
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;

    constructor(adress:AdressProps){
        this.street = adress.street
        this.number = adress.number
        this.city = adress.city
        this.state = adress.state
        this.zipCode =adress.zipCode
        this.complement = adress.complement
    }


}