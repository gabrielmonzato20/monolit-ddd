import { Model,Column, PrimaryKey, Table,HasMany, BelongsToMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import ProductModel from "./product.model";
import InvoiceModel from "./invoice.model";

@Table({
  tableName: "invoices-products",
  timestamps: false,
})
export default class InvoiceProductModel extends Model {

  @ForeignKey(() => ProductModel)
  @Column({ allowNull: false })
  declare product_id: string;

  @BelongsTo(() => ProductModel)
  declare product: ProductModel;

  @ForeignKey(() => InvoiceModel)
  @Column({ allowNull: false })
  declare invoice_id: string;

  @BelongsTo(() => InvoiceModel)
  declare invoice: InvoiceModel;
  
}