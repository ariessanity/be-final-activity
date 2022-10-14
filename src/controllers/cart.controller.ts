import CartService from "../services/cart.service";

class CartController {
  async getAllCartItems() {
    let response = await CartService.getAllCartItems();
    return response;
  }

  async createCart(req: any) {
    let response = await CartService.createCart(req);
    return response;
  }

  async updateCart(req: any) {
    let response = await CartService.updateCart(req);
    return response;
  }

  async deleteCart(req: any) {
    let response = await CartService.deleteCart(req);
    return response;
  }
}
export default new CartController();
