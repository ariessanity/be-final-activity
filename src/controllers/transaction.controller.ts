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

  async getAllTransactionWithDate(req: any) {
    let from = req.from !== null || req.from != undefined ? req.from : 0;
    let to = req.to !== null || req.to != undefined ? req.to : 0;
    let response = await TransactionService.getAllTransactionWithDate(from, to);
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

  async getAllTransactionStatus() {
    let response = await TransactionService.getAllTransactionStatus();
    return response;
  }
}

export default new TransactionController();
