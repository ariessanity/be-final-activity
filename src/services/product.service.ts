import Product from "../models/tables/Product";
import ProductTypes from "../models/dto/productDTO";
import CommonResponse from "../utils/response.utils";
import { OK, NOTFOUND, BADREQUEST, INTERNAL_SERVER_ERROR } from "../utils/constants.utils";
import { OK_MESSAGE, NOTFOUND_MESSAGE, BADREQUEST_MESSAGE, INTERNAL_SERVER_ERROR_MESSAGE } from "../utils/message.utils";
import Cart from "../models/tables/Cart";

class ProductService extends CommonResponse {
  //GET ALL Product
  async getAllProduct() {
    try {
      let exist = await Product.findAll({
        include: {
          model: Cart,
          as: "cart",
        },
      });

      if (exist.length != 0) {
        return this.RESPONSE(OK, exist, OK_MESSAGE);
      } else {
        return this.RESPONSE(NOTFOUND, [], NOTFOUND_MESSAGE);
      }
    } catch (error) {
      return this.RESPONSE(INTERNAL_SERVER_ERROR, error, INTERNAL_SERVER_ERROR_MESSAGE);
    }
  }

  //GET ONE Product
  async getOneProduct(ProductID: number) {
    try {
      let exist = await Product.findOne({
        where: { id: ProductID },
      });
      if (exist != null) {
        return this.RESPONSE(OK, exist, OK_MESSAGE);
      } else {
        return this.RESPONSE(NOTFOUND, [], NOTFOUND_MESSAGE);
      }
    } catch (error) {
      return this.RESPONSE(INTERNAL_SERVER_ERROR, [], INTERNAL_SERVER_ERROR_MESSAGE);
    }
  }

  //CREATE Product
  async createProduct(dto: ProductTypes) {
    try {
      let response = await Product.create({
        product_name: dto.product_name,
        price: dto.price.toFixed(2),
        shop_id: dto.shop_id,
        is_active: dto.is_active,
      });

      if (response != null) {
        return this.RESPONSE(OK, response, OK_MESSAGE);
      } else {
        return this.RESPONSE(NOTFOUND, [], NOTFOUND_MESSAGE);
      }
    } catch (error) {
      return this.RESPONSE(INTERNAL_SERVER_ERROR, error, INTERNAL_SERVER_ERROR_MESSAGE);
    }
  }

  //UPDATE Product
  async updateProduct(dto: ProductTypes) {
    try {
      let exist = await Product.findOne({ where: { id: dto.id } });
      if (exist != null) {
        let updateData = await Product.update(dto, { where: { id: dto.id } });

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

  //DELETE Product
  async deleteProduct(ProductID: number) {
    try {
      let exist = await Product.findOne({ where: { id: ProductID } });

      if (exist != null) {
        let removeData = await Product.destroy({ where: { id: ProductID } });
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

export default new ProductService();
