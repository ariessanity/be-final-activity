import TransactionOrders from "../models/tables/TransactionOrders";
import CommonResponse from "../utils/response.utils";
import { OK, NOTFOUND, BADREQUEST, INTERNAL_SERVER_ERROR } from "../utils/constants.utils";
import { OK_MESSAGE, NOTFOUND_MESSAGE, BADREQUEST_MESSAGE, INTERNAL_SERVER_ERROR_MESSAGE } from "../utils/message.utils";
import TransactionOrderTypes from "../models/dto/transactionOrderDTO";

class TransactionOrdersService extends CommonResponse {
  //GET ALL TransactionOrders
  async getAllTransactionOrders() {
    try {
      let exist = await TransactionOrders.findAll();
      if (exist.length != 0) {
        return this.RESPONSE(OK, exist, OK_MESSAGE);
      } else {
        return this.RESPONSE(NOTFOUND, [], NOTFOUND_MESSAGE);
      }
    } catch (error) {
      return this.RESPONSE(INTERNAL_SERVER_ERROR, error, INTERNAL_SERVER_ERROR_MESSAGE);
    }
  }

  //UPDATE TransactionOrders
  async updateTransactionOrders(dto: TransactionOrderTypes) {
    try {
      let exist = await TransactionOrders.findOne({ where: { id: dto.id } });
      if (exist != null) {
        let updateData = await TransactionOrders.update(dto, { where: { id: dto.id } });
        if (updateData != null) {
          return this.RESPONSE(OK, updateData, OK_MESSAGE);
        } else {
          return this.RESPONSE(NOTFOUND, {}, NOTFOUND_MESSAGE);
        }
      } else {
        return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, NOTFOUND_MESSAGE);
      }
    } catch (error) {
      return this.RESPONSE(INTERNAL_SERVER_ERROR, error, INTERNAL_SERVER_ERROR_MESSAGE);
    }
  }

  //DELETE TransactionOrders
  async deleteTransactionOrders(TransactionOrdersID: number) {
    try {
      let exist = await TransactionOrders.findOne({ where: { id: TransactionOrdersID } });
      if (exist != null) {
        let removeData = await TransactionOrders.destroy({ where: { id: TransactionOrdersID } });
        if (removeData != null) {
          return this.RESPONSE(OK, {}, OK_MESSAGE);
        } else {
          return this.RESPONSE(NOTFOUND, {}, NOTFOUND_MESSAGE);
        }
      } else {
        return this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE);
      }
    } catch (error) {
      return this.RESPONSE(INTERNAL_SERVER_ERROR, error, INTERNAL_SERVER_ERROR_MESSAGE);
    }
  }
}

export default new TransactionOrdersService();
