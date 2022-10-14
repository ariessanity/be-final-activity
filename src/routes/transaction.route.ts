import express, { Router, Request, Response } from "express";
import TransactionController from "../controllers/transaction.controller";
const TransactionRouter: Router = express.Router();
import AuthService from "../services/auth.service";

TransactionRouter.post("/check-out", async (req: Request, res: Response) => {
  let authenticate: any = await AuthService.verify(req.headers["authorization"]);
  if (authenticate.status == 200) {
    let response = await TransactionController.checkOut(req.body);
    return res.status(response.status).send(response);
  } else {
    return res.status(authenticate.status).send(authenticate);
  }
});

TransactionRouter.get("/get-all-transaction", async (req: Request, res: Response) => {
  let authenticate: any = await AuthService.verify(req.headers["authorization"]);
  if (authenticate.status == 200) {
    let response = await TransactionController.getAllTransaction();
    return res.status(response.status).send(response);
  } else {
    return res.status(authenticate.status).send(authenticate);
  }
});

TransactionRouter.put("/update-transaction", async (req: Request, res: Response) => {
  let authenticate: any = await AuthService.verify(req.headers["authorization"]);
  if (authenticate.status == 200) {
    let response = await TransactionController.updateTransaction(req.body);
    return res.status(response.status).send(response);
  } else {
    return res.status(authenticate.status).send(authenticate);
  }
});

TransactionRouter.delete("/delete-transaction/:id", async (req: Request, res: Response) => {
  let authenticate: any = await AuthService.verify(req.headers["authorization"]);
  if (authenticate.status == 200) {
    let response = await TransactionController.deleteTransaction(parseInt(req.params.id));
    return res.status(response.status).send(response);
  } else {
    return res.status(authenticate.status).send(authenticate);
  }
});

export default TransactionRouter;
