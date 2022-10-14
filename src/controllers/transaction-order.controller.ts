import TransactionOrdersService from "../services/transaction-order.service";

class TransactionOrderController {
  async getAllTransactionOrder() {
    let response = await TransactionOrdersService.getAllTransactionOrders();
    return response;
  }

  async updateTransactionOrder(req: any) {
    let response = await TransactionOrdersService.updateTransactionOrders(req);
    return response;
  }

  async deleteTransactionOrder(req: any) {
    let response = await TransactionOrdersService.deleteTransactionOrders(req);
    return response;
  }
}

export default new TransactionOrderController();
