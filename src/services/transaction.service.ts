import Transaction from "../models/tables/Transaction";
import Cart from "../models/tables/Cart";
import Product from "../models/tables/Product";
import TransactionOrders from "../models/tables/TransactionOrders";
import Shop from "../models/tables/Shop";
import TransactionTypes from "../models/dto/transactionDTO";
import CommonResponse from "../utils/response.utils";
import { OK, NOTFOUND, BADREQUEST, INTERNAL_SERVER_ERROR } from "../utils/constants.utils";
import { OK_MESSAGE, NOTFOUND_MESSAGE, BADREQUEST_MESSAGE, INTERNAL_SERVER_ERROR_MESSAGE } from "../utils/message.utils";
import User from "../models/tables/User";
import { Op } from "sequelize";
import moment from "moment-timezone";

class TransactionService extends CommonResponse {
  //Checkout
  async checkOut(dto: TransactionTypes) {
    try {
      let userExist = await User.findAll({ where: { id: dto.user_id } });
      if (userExist.length !== 0) {
        //Total Price
        let totalPrice = await Product.sum("price", { where: { shop_id: dto.shop_id } });
        //Checking for Cart items
        let cartItems = await Cart.findAll({ where: { shop_id: dto.shop_id } });
        if (cartItems.length !== 0) {
          //Checking if status is Active, Ongoing or Completed
          if (dto.transaction_status === 3) {
            //Checking for shop if deactivated
            let shopExist = await Shop.findAll({ where: { id: dto.shop_id, is_active: true } });
            if (shopExist.length !== 0) {
              let response = await Transaction.create({
                user_id: dto.user_id,
                shop_id: dto.shop_id,
                transaction_date: new Date(new Date().toDateString()),
                total_price: totalPrice.toFixed(2),
                transaction_status: dto.transaction_status,
                is_active: dto.is_active,
              });

              //Creating Transaction Order
              let cartItemsId = await Cart.findAll({ where: { shop_id: dto.shop_id } });
              {
                cartItemsId.map(async (cartId) => {
                  await TransactionOrders.create({
                    transaction_id: response.id,
                    cart_id: cartId.id,
                  });
                });
              }

              if (response != null) {
                return this.RESPONSE(OK, response, OK_MESSAGE);
              } else {
                return this.RESPONSE(NOTFOUND, [], NOTFOUND_MESSAGE);
              }
            } else {
              return this.RESPONSE(NOTFOUND, [], "Shop is deactivated or not exist");
            }
          } else {
            return this.RESPONSE(NOTFOUND, [], "Can't proceed transaction is active");
          }
        } else {
          return this.RESPONSE(NOTFOUND, [], "No cart item found");
        }
      } else {
        return this.RESPONSE(NOTFOUND, [], "User does not exist");
      }
    } catch (error) {
      return this.RESPONSE(INTERNAL_SERVER_ERROR, error, INTERNAL_SERVER_ERROR_MESSAGE);
    }
  }

  //GET ALL Transaction
  async getAllTransaction() {
    try {
      let exist = await Transaction.findAll();

      if (exist.length != 0) {
        return this.RESPONSE(OK, exist, OK_MESSAGE);
      } else {
        return this.RESPONSE(NOTFOUND, [], NOTFOUND_MESSAGE);
      }
    } catch (error) {
      return this.RESPONSE(INTERNAL_SERVER_ERROR, error, INTERNAL_SERVER_ERROR_MESSAGE);
    }
  }

  //GET ALL Transaction With Date
  async getAllTransactionWithDate(from: any, to: any) {
    try {
      var dateFrom = await moment.tz(from, "YYYY-MM-DD", "Asia/Manila").format();
      var dateTo = await moment.tz(to, "YYYY-MM-DD", "Asia/Manila").format();

      console.log(dateFrom);

      if (from == 0 && to == 0) {
        let exist = await Transaction.findAll();
        if (exist.length != 0) {
          return this.RESPONSE(OK, exist, OK_MESSAGE);
        } else {
          return this.RESPONSE(NOTFOUND, [], NOTFOUND_MESSAGE);
        }
      } else if (dateFrom == dateTo) {
        let exist = await Transaction.findAll({
          where: { transaction_date: from || to },
        });
        if (exist.length != 0) {
          return this.RESPONSE(OK, exist, OK_MESSAGE);
        } else {
          return this.RESPONSE(NOTFOUND, [], NOTFOUND_MESSAGE);
        }
      } else {
        let exist = await Transaction.findAll({
          where: { transaction_date: { [Op.and]: { [Op.lte]: dateTo, [Op.gte]: dateFrom } } },
        });
        if (exist.length != 0) {
          return this.RESPONSE(OK, exist, OK_MESSAGE);
        } else {
          return this.RESPONSE(NOTFOUND, [], NOTFOUND_MESSAGE);
        }
      }
    } catch (error) {
      return this.RESPONSE(INTERNAL_SERVER_ERROR, error, INTERNAL_SERVER_ERROR_MESSAGE);
    }
  }

  //UPDATE Transaction
  async updateTransaction(dto: TransactionTypes) {
    try {
      let exist = await Transaction.findOne({ where: { id: dto.id } });
      if (exist != null) {
        let updateData = await Transaction.update(dto, { where: { id: dto.id } });

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

  //DELETE Transaction
  async deleteTransaction(TransactionID: number) {
    try {
      let exist = await Transaction.findOne({ where: { id: TransactionID } });

      if (exist != null) {
        let removeData = await Transaction.destroy({ where: { id: TransactionID } });
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

  async getAllTransactionStatus() {
    try {
      let totalPrice = await Transaction.sum("total_price", { where: { transaction_status: 3 } });
      let totalTransaction = await Transaction.count();
      let successfulTransaction = await Transaction.count({ where: { transaction_status: 3 } });
      let failedTransaction = await Transaction.count({ where: { transaction_status: { [Op.or]: [1, 2, 4] } } }); //1- Active 2-Ongoing 4-Failed

      let averageTransactionPerDay = totalTransaction / 365;
      let ratioOfSuccess = (successfulTransaction / totalTransaction) * 100;
      let ratioOfFailed = (failedTransaction / totalTransaction) * 100;
      let ratio = failedTransaction / successfulTransaction;

      return this.RESPONSE(
        OK,
        {
          total_price: totalPrice,
          average_transaction_per_day: +averageTransactionPerDay.toFixed(2),
          total_transaction: totalTransaction,
          successfull_transaction: successfulTransaction,
          failed_transaction: failedTransaction,
          ratio_success: +ratioOfSuccess.toFixed(2),
          ratio_failed: +ratioOfFailed.toFixed(2),
          ratio: +ratio.toFixed(2),
        },
        OK_MESSAGE
      );
    } catch (error) {
      return this.RESPONSE(INTERNAL_SERVER_ERROR, error, INTERNAL_SERVER_ERROR_MESSAGE);
    }
  }
}

export default new TransactionService();
