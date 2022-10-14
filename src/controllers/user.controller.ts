import UserService from "../services/user.service";

class UserController {
  async login(req: any) {
    let response = await UserService.login(req);
    return response;
  }

  async signup(req: any) {
    let response = await UserService.signup(req);
    return response;
  }
  async getUser() {
    let response = await UserService.getUser();
    return response;
  }

  async getOneUser(req: any) {
    let response = await UserService.getOneUser(req);
    return response;
  }

  async createUser(req: any) {
    let response = await UserService.createUser(req);
    return response;
  }

  async updateUser(req: any) {
    let response = await UserService.updateUser(req);
    return response;
  }

  async deleteUser(req: any) {
    let response = await UserService.deleteUser(req);
    return response;
  }
}

export default new UserController();
