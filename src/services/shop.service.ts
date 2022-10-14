import Shop from "../models/tables/Shop";
import Product from "../models/tables/Product";
import CommonResponse from "../utils/response.utils";
import { OK, NOTFOUND, BADREQUEST, INTERNAL_SERVER_ERROR } from "../utils/constants.utils";
import { OK_MESSAGE, NOTFOUND_MESSAGE, BADREQUEST_MESSAGE, INTERNAL_SERVER_ERROR_MESSAGE } from "../utils/message.utils";
import ShopTypes from "../models/dto/shopDTO";

class ShopService extends CommonResponse {
  //GET ALL SHOP
  async getAllShop() {
    try {
      let exist = await Shop.findAll({
        include: {
          model: Product,
          as: "product_items",
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

  //GET ONE Shop
  async getOneShop(dto: number) {
    try {
      let exist = await Shop.findOne({
        where: { id: dto },
        include: {
          model: Product,
          as: "product_items",
        },
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

  //CREATE SHOP
  async createShop(dto: ShopTypes) {
    try {
      let response = await Shop.create({
        name: dto.name,
        address: dto.address,
        business_type: dto.business_type,
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

  //UPDATE SHOP
  async updateShop(dto: ShopTypes) {
    try {
      let exist = await Shop.findOne({ where: { id: dto.id } });
      if (exist != null) {
        let updateData = await Shop.update(dto, { where: { id: dto.id } });

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

  //DELETE SHOP
  async deleteShop(ShopID: number) {
    try {
      let exist = await Shop.findOne({ where: { id: ShopID } });

      if (exist != null) {
        let removeData = await Shop.destroy({ where: { id: ShopID } });
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

  //ACTIVATE AND DE-ACTIVATE
  async toggleShop(dto: ShopTypes) {
    try {
      let exist = await Shop.findOne({ where: { id: dto.id } });
      if (exist != null) {
        let updateData = await Shop.update(dto, { where: { id: dto.id } });

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
}

export default new ShopService();
