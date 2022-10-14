import { Table, Column, DataType, Model, PrimaryKey, AutoIncrement, ForeignKey } from "sequelize-typescript";
import User from "./User";
import Shop from "./Shop";

@Table({ tableName: "Transaction" })
export default class Transaction extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id?: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id?: number;

  @ForeignKey(() => Shop)
  @Column(DataType.INTEGER)
  shop_id?: number;

  @Column(DataType.DATE)
  transaction_date?: Date;

  @Column(DataType.FLOAT)
  total_price?: number;

  @Column(DataType.INTEGER)
  transaction_status?: number;

  @Column(DataType.BOOLEAN)
  is_active?: boolean;
}
