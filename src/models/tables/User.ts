import { Table, Column, DataType, Model, HasMany } from "sequelize-typescript";
import Cart from "./Cart";
import Transaction from "./Transaction";

@Table({ tableName: "User" })
export default class User extends Model {
  @Column(DataType.STRING)
  username?: string;

  @Column(DataType.STRING)
  password?: string;

  @HasMany(() => Cart)
  cart_items?: Cart[] = [];

  @HasMany(() => Transaction)
  transactions?: Transaction[] = [];
}
