import User from "../models/tables/User";
import Cart from "../models/tables/Cart";
import CommonResponse from "../utils/response.utils";
import bcrypt from "bcrypt";
import AuthService from "./auth.service";
import UserTypes from "../models/dto/userDTO";
import { OK, NOTFOUND, BADREQUEST, INTERNAL_SERVER_ERROR } from "../utils/constants.utils";
import {
  OK_MESSAGE,
  NOTFOUND_MESSAGE,
  BADREQUEST_MESSAGE,
  INTERNAL_SERVER_ERROR_MESSAGE,
  BADREQUEST_USER_ALREADY_EXIST,
} from "../utils/message.utils";

class UserService extends CommonResponse {
  //LOGIN
  async login(dto: UserTypes) {
    try {
      let exist: any = await User.findOne({
        where: { username: dto.username },
      });

      if (exist != null) {
        let passwordConfirm: boolean = await bcrypt.compare(dto.password.toString(), exist["dataValues"].password);

        if (passwordConfirm == true) {
          let { response } = await AuthService.auth(exist["dataValues"]);
          return this.RESPONSE(OK, { response, username: dto.username }, OK_MESSAGE);
        } else {
          return this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE);
        }
      } else {
        // return this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE);
      }
    } catch (error) {
      return this.RESPONSE(INTERNAL_SERVER_ERROR, error, INTERNAL_SERVER_ERROR_MESSAGE);
    }
  }

  //SIGNUP
  async signup(dto: UserTypes) {
    try {
      if (dto != null) {
        let exist = await User.findOne({
          where: { username: dto.username },
        });
        if (exist != null) {
          return this.RESPONSE(BADREQUEST, {}, BADREQUEST_USER_ALREADY_EXIST);
        }
        if (dto.password == dto.confirmPassword) {
          let hashPassword = await bcrypt.hash(dto.password.toString(), 10);
          let response = await User.create({
            username: dto.username,
            password: hashPassword,
          });
          if (response != null) {
            return this.RESPONSE(OK, response, OK_MESSAGE);
          } else {
            return this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE);
          }
        } else {
          return this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE);
        }
      } else {
        return this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE);
      }
    } catch (error) {
      return this.RESPONSE(INTERNAL_SERVER_ERROR, error, INTERNAL_SERVER_ERROR_MESSAGE);
    }
  }

  //GET ALL USER
  async getUser() {
    try {
      let exist = await User.findAll({
        include: {
          model: Cart,
          as: "cart_items",
        },
      });

      if (exist.length != 0) {
        return this.RESPONSE(OK, exist, OK_MESSAGE);
      } else {
        return this.RESPONSE(NOTFOUND, [], NOTFOUND_MESSAGE);
      }
    } catch (error: any) {
      return this.RESPONSE(INTERNAL_SERVER_ERROR, [], INTERNAL_SERVER_ERROR_MESSAGE);
    }
  }

  //GET ONE USER
  async getOneUser(dto: UserTypes) {
    try {
      let exist = await User.findOne({
        where: { id: dto },
        include: {
          model: Cart,
          as: "cart_items",
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

  //CREATE USER
  async createUser(dto: UserTypes) {
    try {
      let response = await User.create({ ...dto });

      if (response != null) {
        return this.RESPONSE(OK, response, OK_MESSAGE);
      } else {
        return this.RESPONSE(NOTFOUND, [], NOTFOUND_MESSAGE);
      }
    } catch (error: any) {
      return this.RESPONSE(INTERNAL_SERVER_ERROR, [], "Already exist ID");
    }
  }

  //UPDATE USER
  async updateUser(dto: UserTypes) {
    try {
      let exist = await User.findOne({ where: { id: dto.id } });
      if (exist != null) {
        let updateData = await User.update(dto, { where: { id: dto.id } });

        if (updateData != null) {
          return this.RESPONSE(OK, updateData, OK_MESSAGE);
        } else {
          return this.RESPONSE(NOTFOUND, [], NOTFOUND_MESSAGE);
        }
      } else {
        return this.RESPONSE(NOTFOUND, [], NOTFOUND_MESSAGE);
      }
    } catch (error: any) {
      return this.RESPONSE(INTERNAL_SERVER_ERROR, [], INTERNAL_SERVER_ERROR_MESSAGE);
    }
  }

  //DELETE USER
  async deleteUser(dto: UserTypes) {
    try {
      let exist = await User.findOne({ where: { id: dto } });
      if (exist != null) {
        let removeData = await User.destroy({ where: { id: dto } });
        if (removeData != null) {
          return this.RESPONSE(OK, {}, OK_MESSAGE);
        } else {
          return this.RESPONSE(NOTFOUND, {}, NOTFOUND_MESSAGE);
        }
      } else {
        return this.RESPONSE(NOTFOUND, {}, NOTFOUND_MESSAGE);
      }
    } catch (error) {
      return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, INTERNAL_SERVER_ERROR_MESSAGE);
    }
  }
}

export default new UserService();
