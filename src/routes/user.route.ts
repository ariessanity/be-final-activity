import express, { Router, Request, Response } from "express";
import UserController from "../controllers/user.controller";
const UserRouter: Router = express.Router();
import AuthService from "../services/auth.service";

UserRouter.post("/user-login", async (req: Request, res: Response) => {
  let response = await UserController.login(req.body);
  return res.status(200).send(response);
});

UserRouter.post("/user-signup", async (req: Request, res: Response) => {
  let response = await UserController.signup(req.body);
  return res.status(response.status).send(response);
});

UserRouter.get("/get-data", async (req: Request, res: Response) => {
  let authenticate: any = await AuthService.verify(req.headers["authorization"]);
  if (authenticate.status == 200) {
    let response = await UserController.getUser();
    res.status(response.status).send(response);
  } else {
    return res.status(authenticate.status).send(authenticate);
  }
});

UserRouter.get("/get-one-data/:id", async (req: Request, res: Response) => {
  let authenticate: any = await AuthService.verify(req.headers["authorization"]);
  if (authenticate.status == 200) {
    let response = await UserController.getOneUser(parseInt(req.params.id));
    res.status(response.status).send(response);
  } else {
    return res.status(authenticate.status).send(authenticate);
  }
});

UserRouter.post("/create-data", async (req: Request, res: Response) => {
  let authenticate: any = await AuthService.verify(req.headers["authorization"]);
  if (authenticate.status == 200) {
    let response = await UserController.createUser(req.body);
    res.status(response.status).send(response);
  } else {
    return res.status(authenticate.status).send(authenticate);
  }
});

UserRouter.put("/update-data", async (req: Request, res: Response) => {
  let authenticate: any = await AuthService.verify(req.headers["authorization"]);
  if (authenticate.status == 200) {
    let response = await UserController.updateUser(req.body);
    res.status(response.status).send(response);
  } else {
    return res.status(authenticate.status).send(authenticate);
  }
});

UserRouter.delete("/delete-data/:id", async (req: Request, res: Response) => {
  let authenticate: any = await AuthService.verify(req.headers["authorization"]);
  if (authenticate.status == 200) {
    let response = await UserController.deleteUser(parseInt(req.params.id));
    res.status(response.status).send(response);
  } else {
    return res.status(authenticate.status).send(authenticate);
  }
});

export default UserRouter;
