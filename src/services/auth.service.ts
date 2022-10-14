import CommonResponse from "../utils/response.utils";
import jwt from "jsonwebtoken";
import { OK, BADREQUEST, INTERNAL_SERVER_ERROR } from "../utils/constants.utils";
import { OK_MESSAGE, BADREQUEST_MESSAGE, INTERNAL_SERVER_ERROR_MESSAGE } from "../utils/message.utils";
import dotenv, { DotenvConfigOutput } from "dotenv";

const env_config: DotenvConfigOutput = dotenv.config();
const SECRET = process.env.SECRET_KEY || "1234";

class AuthService extends CommonResponse {
  //AUTH
  async auth(reqObject: any) {
    try {
      let authentication = jwt.sign(reqObject, SECRET);

      if (authentication != null) {
        return this.RESPONSE(OK, { accessToken: authentication }, OK_MESSAGE);
      } else {
        return this.RESPONSE(BADREQUEST, [], BADREQUEST_MESSAGE);
      }
    } catch (error) {
      return this.RESPONSE(INTERNAL_SERVER_ERROR, error, INTERNAL_SERVER_ERROR_MESSAGE);
    }
  }

  //VERIFY
  async verify(token: any) {
    try {
      if (token != null) {
        var getToken = token.split(" ")[1];
      }
      if (getToken != null) {
        let authentication = await jwt.verify(getToken, SECRET);

        if (authentication != null) {
          return this.RESPONSE(OK, authentication, OK_MESSAGE);
        } else {
          return this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE);
        }
      }
    } catch (error) {
      return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, INTERNAL_SERVER_ERROR_MESSAGE);
    }
  }
}

export default new AuthService();
