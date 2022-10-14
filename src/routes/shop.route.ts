import express, { Router, Request, Response } from "express";
import ShopController from "../controllers/shop.controller";
const ShopRouter: Router = express.Router();
import AuthService from "../services/auth.service";

ShopRouter.get("/get-all-shop-by-user-id", async (req: Request, res: Response) => {
  let authenticate: any = await AuthService.verify(req.headers["authorization"]);
  if (authenticate.status == 200) {
    let response = await ShopController.getAllShop();
    return res.status(response.status).send(response);
  } else {
    return res.status(authenticate.status).send(authenticate);
  }
});

ShopRouter.get("/get-one-shop/:id", async (req: Request, res: Response) => {
  let authenticate: any = await AuthService.verify(req.headers["authorization"]);
  if (authenticate.status == 200) {
    let response = await ShopController.getOneShop(parseInt(req.params.id));
    res.status(response.status).send(response);
  } else {
    return res.status(authenticate.status).send(authenticate);
  }
});

ShopRouter.post("/create-shop", async (req: Request, res: Response) => {
  let authenticate: any = await AuthService.verify(req.headers["authorization"]);
  if (authenticate.status == 200) {
    let response = await ShopController.createShop(req.body);
    return res.status(response.status).send(response);
  } else {
    return res.status(authenticate.status).send(authenticate);
  }
});

ShopRouter.put("/update-shop", async (req: Request, res: Response) => {
  let authenticate: any = await AuthService.verify(req.headers["authorization"]);
  if (authenticate.status == 200) {
    let response = await ShopController.updateShop(req.body);
    return res.status(response.status).send(response);
  } else {
    return res.status(authenticate.status).send(authenticate);
  }
});

ShopRouter.delete("/delete-shop/:id", async (req: Request, res: Response) => {
  let authenticate: any = await AuthService.verify(req.headers["authorization"]);
  if (authenticate.status == 200) {
    let response = await ShopController.deleteShop(parseInt(req.params.id));
    return res.status(response.status).send(response);
  } else {
    return res.status(authenticate.status).send(authenticate);
  }
});

ShopRouter.put("/toggle-shop", async (req: Request, res: Response) => {
  let authenticate: any = await AuthService.verify(req.headers["authorization"]);
  if (authenticate.status == 200) {
    let response = await ShopController.toggleShop(req.body);
    return res.status(response.status).send(response);
  } else {
    return res.status(authenticate.status).send(authenticate);
  }
});

export default ShopRouter;
