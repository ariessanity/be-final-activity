import { Table, Column, DataType, Model, HasMany, ForeignKey } from "sequelize-typescript";
import Cart from "./Cart";
import Shop from "./Shop";

@Table({ tableName: "Product" })
export default class Product extends Model {
  @Column(DataType.STRING)
  product_name?: string;

  @Column(DataType.FLOAT)
  price?: number;

  @Column(DataType.BOOLEAN)
  is_active?: boolean;

  @ForeignKey(() => Shop)
  @Column(DataType.INTEGER)
  shop_id?: number;

  @HasMany(() => Cart)
  cart: Cart[] = [];

}
