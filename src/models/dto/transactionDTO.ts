export default interface TransactionTypes {
  id: number;
  user_id: number;
  shop_id: number;
  transaction_date: Date;
  total_price: number;
  transaction_status: number;
  is_active: boolean;
}
