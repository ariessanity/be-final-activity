import { Table, Column, DataType, Model, ForeignKey, PrimaryKey, AutoIncrement, BelongsToMany, BelongsTo } from "sequelize-typescript";
import User from "./User";
import Product from "./Product";
import Shop from "./Shop";

@Table({ tableName: "Cart" })
export default class Cart extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id?: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id?: number;

  @ForeignKey(() => Product)
  @Column(DataType.INTEGER)
  product_id?: number;

  @ForeignKey(() => Shop)
  @Column(DataType.INTEGER)
  shop_id?: number;

  @Column(DataType.BOOLEAN)
  is_active?: boolean;
}
