import ProductService from "../services/product.service";

class ProductController {
  async getAllProduct() {
    let response = await ProductService.getAllProduct();
    return response;
  }

  async getOneProduct(req: any) {
    let response = await ProductService.getOneProduct(req);
    return response;
  }

  async createProduct(req: any) {
    let response = await ProductService.createProduct(req);
    return response;
  }

  async updateProduct(req: any) {
    let response = await ProductService.updateProduct(req);
    return response;
  }

  async deleteProduct(req: any) {
    let response = await ProductService.deleteProduct(req);
    return response;
  }
}
export default new ProductController();
