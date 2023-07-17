import { Model, Column, PrimaryKey, Table, BelongsToMany } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";
import InvoiceProductModel from "./invoice-product.model";

@Table({
  tableName: "products",
  timestamps: false,
})
export default class ProductModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  price: number;

  @BelongsToMany(() => InvoiceModel, { through: () => InvoiceProductModel })
  items: InvoiceModel[];
}