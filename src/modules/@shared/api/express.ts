import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../../product-adm/repository/product.model";
import { productRoute } from "../../product-adm/api/product.api";
import { clientRoute } from "../../client-adm/api/client.api";
import { ClientModel } from "../../client-adm/repository/client.model";

export const app: Express = express();
app.use(express.json());
app.use("/product", productRoute);
app.use("/clients", clientRoute);



export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  await sequelize.addModels([ProductModel,ClientModel]);
  await sequelize.sync();
}
setupDb();
