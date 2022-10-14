import { Table, Column, DataType, Model, HasMany, BelongsToMany } from "sequelize-typescript";
import Product from "./Product";
import Cart from "./Cart";
import Transaction from "./Transaction";

@Table({ tableName: "Shop" })
export default class Shop extends Model {
  @Column(DataType.STRING)
  name?: string;

  @Column(DataType.STRING)
  address?: string;

  @Column(DataType.STRING)
  business_type?: string;

  @Column(DataType.BOOLEAN)
  is_active?: boolean;

  @HasMany(() => Transaction)
  transaction?: Transaction[] = [];

  @HasMany(() => Product)
  product_items: Product[] = [];

  @HasMany(() => Cart)
  cart: Cart[] = [];
}
