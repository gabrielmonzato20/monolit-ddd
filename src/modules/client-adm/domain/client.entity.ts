import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

type ClientProps = {
  id?: Id;
  name: string;
  email: string;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export default class Client extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _email: string;
  private _address: string;

  constructor(props: ClientProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._name = props.name;
    this._email = props.email;
    this._address = props.address;
    this._validade()
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get address(): string {
    return this._address;
  }

  _validade(): void {
    if(this._name == "" || this._name == undefined || this._name == null){
      throw new Error("Name must be present");
    }
    if(this._email == "" || this._email == undefined || this._email == null){
      throw new Error("Name must be present");
    }
    if(this._address == "" || this._address == undefined || this._address == null){
      throw new Error("Name must be present");
    }
  }
}
