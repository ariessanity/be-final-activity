import { Table, Column, DataType, Model, PrimaryKey, AutoIncrement, ForeignKey } from "sequelize-typescript";
import Transaction from "./Transaction";
import Cart from "./Cart";

@Table({ tableName: "TransactionOrders" })
export default class TransactionOrders extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id?: number;

  @ForeignKey(() => Transaction)
  @Column(DataType.INTEGER)
  transaction_id?: number;

  @ForeignKey(() => Cart)
  @Column(DataType.INTEGER)
  cart_id?: number;
}
