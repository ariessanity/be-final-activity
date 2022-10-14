import Cart from "../models/tables/Cart";
import Product from "../models/tables/Product";
import Shop from "../models/tables/Shop";
import CartTypes from "../models/dto/cartDTO";
import CommonResponse from "../utils/response.utils";
import { OK, NOTFOUND, INTERNAL_SERVER_ERROR } from "../utils/constants.utils";
import { OK_MESSAGE, NOTFOUND_MESSAGE, INTERNAL_SERVER_ERROR_MESSAGE } from "../utils/message.utils";

class CartService extends CommonResponse {
  //GET CART ITEMS
  async getAllCartItems() {
    try {
      let exist = await Cart.findAll();

      if (exist.length != 0) {
        return this.RESPONSE(OK, exist, OK_MESSAGE);
      } else {
        return this.RESPONSE(NOTFOUND, [], NOTFOUND_MESSAGE);
      }
    } catch (error) {
      return this.RESPONSE(INTERNAL_SERVER_ERROR, error, INTERNAL_SERVER_ERROR_MESSAGE);
    }
  }

  //CREATE CART ITEMS
  async createCart(dto: CartTypes) {
    try {
      //Checking for non existing product
      let exist = await Product.findAll({ where: { id: dto.product_id } });

      if (exist.length !== 0) {
        //Checking for User should not add an item if the shop of the said item is deactivated or deleted.
        let shopExist = await Shop.findAll({ where: { id: dto.shop_id, is_active: true } });

        if (shopExist.length !== 0) {
          let existCart = await Cart.findAll({ where: { product_id: dto.product_id, shop_id: dto.shop_id } });

          if (existCart.length === 0) {
            //Checking for user can only add 1 to 5 items per shop.
            let itemPerShop = await Cart.findAll({ where: { shop_id: dto.shop_id } });
            if (itemPerShop.length < 5) {
              let response = await Cart.create({
                id: dto.id,
                user_id: dto.user_id,
                shop_id: dto.shop_id,
                product_id: dto.product_id,
                is_active: dto.is_active,
              });

              if (response != null) {
                return this.RESPONSE(OK, response, OK_MESSAGE);
              } else {
                return this.RESPONSE(NOTFOUND, [], NOTFOUND_MESSAGE);
              }
            } else {
              return this.RESPONSE(NOTFOUND, [], "Not exceed to 5 items");
            }
          } else {
            return this.RESPONSE(NOTFOUND, [], "Item already added to cart");
          }
        } else {
          return this.RESPONSE(NOTFOUND, [], "Shop is deactivated or not exist");
        }
      } else {
        return this.RESPONSE(NOTFOUND, [], "Item does not exist");
      }
    } catch (error) {
      return this.RESPONSE(INTERNAL_SERVER_ERROR, error, INTERNAL_SERVER_ERROR_MESSAGE);
    }
  }

  //UPDATE CART
  async updateCart(dto: CartTypes) {
    try {
      let exist = await Cart.findOne({ where: { id: dto.id } });
      if (exist != null) {
        let updateData = await Cart.update(dto, { where: { id: dto.id } });

        if (updateData != null) {
          return this.RESPONSE(OK, updateData, OK_MESSAGE);
        } else {
          return this.RESPONSE(NOTFOUND, {}, NOTFOUND_MESSAGE);
        }
      } else {
        return this.RESPONSE(NOTFOUND, {}, NOTFOUND_MESSAGE);
      }
    } catch (error) {
      return this.RESPONSE(INTERNAL_SERVER_ERROR, error, INTERNAL_SERVER_ERROR_MESSAGE);
    }
  }

  //DELETE CART
  async deleteCart(cartID: number) {
    try {
      let exist = await Cart.findOne({ where: { id: cartID } });

      if (exist != null) {
        let removeData = await Cart.destroy({ where: { id: cartID } });
        if (removeData != null) {
          return this.RESPONSE(OK, {}, OK_MESSAGE);
        } else {
          return this.RESPONSE(NOTFOUND, {}, NOTFOUND_MESSAGE);
        }
      } else {
        return this.RESPONSE(NOTFOUND, {}, NOTFOUND_MESSAGE);
      }
    } catch (error) {
      return this.RESPONSE(INTERNAL_SERVER_ERROR, error, INTERNAL_SERVER_ERROR_MESSAGE);
    }
  }
}

export default new CartService();
