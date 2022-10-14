import express, { Router, Request, Response } from "express";
import TransactionOrderController from "../controllers/transaction-order.controller";
const TransactionOrderRouter: Router = express.Router();
import AuthService from "../services/auth.service";

TransactionOrderRouter.get("/get-all-transaction-orders", async (req: Request, res: Response) => {
  let authenticate: any = await AuthService.verify(req.headers["authorization"]);
  if (authenticate.status == 200) {
    let response = await TransactionOrderController.getAllTransactionOrder();
    return res.status(response.status).send(response);
  } else {
    return res.status(authenticate.status).send(authenticate);
  }
});

TransactionOrderRouter.put("/update-transaction-orders", async (req: Request, res: Response) => {
  let authenticate: any = await AuthService.verify(req.headers["authorization"]);
  if (authenticate.status == 200) {
    let response = await TransactionOrderController.updateTransactionOrder(req.body);
    return res.status(response.status).send(response);
  } else {
    return res.status(authenticate.status).send(authenticate);
  }
});

TransactionOrderRouter.delete("/delete-transaction-orders/:id", async (req: Request, res: Response) => {
  let authenticate: any = await AuthService.verify(req.headers["authorization"]);
  if (authenticate.status == 200) {
    let response = await TransactionOrderController.deleteTransactionOrder(parseInt(req.params.id));
    return res.status(response.status).send(response);
  } else {
    return res.status(authenticate.status).send(authenticate);
  }
});

export default TransactionOrderRouter;
