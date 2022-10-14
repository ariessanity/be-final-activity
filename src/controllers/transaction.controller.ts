import TransactionService from "../services/transaction.service";

class TransactionController {
  async checkOut(req: any) {
    let response = await TransactionService.checkOut(req);
    return response;
  }

  async getAllTransaction() {
    let response = await TransactionService.getAllTransaction();
    return response;
  }

  async updateTransaction(req: any) {
    let response = await TransactionService.updateTransaction(req);
    return response;
  }

  async deleteTransaction(req: any) {
    let response = await TransactionService.deleteTransaction(req);
    return response;
  }
}

export default new TransactionController();
