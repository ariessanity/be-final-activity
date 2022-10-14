import ShopService from "../services/shop.service";

class ShopController {
  async getAllShop() {
    let response = await ShopService.getAllShop();
    return response;
  }

  async getOneShop(req: any) {
    let response = await ShopService.getOneShop(req);
    return response;
  }

  async createShop(req: any) {
    let response = await ShopService.createShop(req);
    return response;
  }

  async updateShop(req: any) {
    let response = await ShopService.updateShop(req);
    return response;
  }

  async deleteShop(req: any) {
    let response = await ShopService.deleteShop(req);
    return response;
  }

  async toggleShop(req: any) {
    let response = await ShopService.toggleShop(req);
    return response;
  }
}

export default new ShopController();
