import express, { Router, Request, Response } from "express";
import ProductController from "../controllers/product.controller";
const ProductRouter: Router = express.Router();
import AuthService from "../services/auth.service";

ProductRouter.get("/get-all-product", async (req: Request, res: Response) => {
  let authenticate: any = await AuthService.verify(req.headers["authorization"]);
  if (authenticate.status == 200) {
    let response = await ProductController.getAllProduct();
    return res.status(response.status).send(response);
  } else {
    return res.status(authenticate.status).send(authenticate);
  }
});

ProductRouter.get("/get-one-product/:id", async (req: Request, res: Response) => {
  let authenticate: any = await AuthService.verify(req.headers["authorization"]);
  if (authenticate.status == 200) {
    let response = await ProductController.getOneProduct(parseInt(req.params.id));
    res.status(response.status).send(response);
  } else {
    return res.status(authenticate.status).send(authenticate);
  }
});

ProductRouter.post("/create-product", async (req: Request, res: Response) => {
  let authenticate: any = await AuthService.verify(req.headers["authorization"]);
  if (authenticate.status == 200) {
    let response = await ProductController.createProduct(req.body);
    return res.status(response.status).send(response);
  } else {
    return res.status(authenticate.status).send(authenticate);
  }
});

ProductRouter.put("/update-product", async (req: Request, res: Response) => {
  let authenticate: any = await AuthService.verify(req.headers["authorization"]);
  if (authenticate.status == 200) {
    let response = await ProductController.updateProduct(req.body);
    return res.status(response.status).send(response);
  } else {
    return res.status(authenticate.status).send(authenticate);
  }
});

ProductRouter.delete("/delete-product/:id", async (req: Request, res: Response) => {
  let authenticate: any = await AuthService.verify(req.headers["authorization"]);
  if (authenticate.status == 200) {
    let response = await ProductController.deleteProduct(parseInt(req.params.id));
    return res.status(response.status).send(response);
  } else {
    return res.status(authenticate.status).send(authenticate);
  }
});

export default ProductRouter;
