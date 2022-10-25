import dotenv, { DotenvConfigOutput } from "dotenv";
import config from "./config/config";
import express, { Application, Request, Response, json } from "express";
import cors from "cors";
const app: Application = express();

const env_config: DotenvConfigOutput = dotenv.config();
const PORT = process.env.PORT || 3222;

//Routes
import UserRouter from "./routes/user.route";
import ShopRouter from "./routes/shop.route";
import ProductRouter from "./routes/product.route";
import CartRouter from "./routes/cart.route";
import TransactionRouter from "./routes/transaction.route";
import TransactionOrderRouter from "./routes/transaction-order.route";

//Middleware
app.use(json());
app.use(cors());

//Routes
app.use(UserRouter);
app.use(ShopRouter);
app.use(ProductRouter);
app.use(CartRouter);
app.use(TransactionRouter);
app.use(TransactionOrderRouter);

//Authentication
let serve = async () => {
  config.authenticate();
  config.sync({ force: false });

  app.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`);
  });
};

serve();
